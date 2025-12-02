
import uuid
from flask import Blueprint, jsonify, request
from ..extensions import db, serializer, mail,bcrypt
from ..database.models import User, Otp
import logging, traceback
from datetime import datetime
from flask_mail import Message
from ..config import Config
from flask_jwt_extended import create_access_token
from datetime import timedelta, datetime
from flask_jwt_extended import jwt_required, get_jwt_identity



auth_bp = Blueprint('auth_bp',__name__)


#signup
@auth_bp.route("/sign-up",methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if User.query.filter_by(email=data.get('email')).first()\
            or User.query.filter_by(username=data.get('username')).first():
            return jsonify({"error":"Username already exists"}), 409
        
        raw_bday = data.get('bday')
        birthday = datetime.strptime(raw_bday, '%Y-%m-%d') if raw_bday else None
        tupid = data.get('tup_id').lower()

        new_user = User(
            data.get('username'),
            data.get('password'),
            data.get('email'),
            birthday,
            tupid
        )
        new_user.set_password(data.get('password'))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"response":"user successfully created",
                        "id":new_user.id,"username":new_user.username,
                        "email":new_user.email,"birthday":new_user.birthday}), 201
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"error":"something went wrong"}), 500


#signin   
@auth_bp.route('/sign-in',methods=['POST'])
def signin():
    try:
        data = request.get_json() or {}
        raw_tup = data.get('tup_id') or ''
        tup_key = raw_tup.lower()
        user = User.query.filter_by(tup_id=tup_key).first()
        
        if not user or not user.check_password(data.get('password')):
            return jsonify({'error':'invalid tup id or password'}), 401
        
        return jsonify({"id":user.id,"username":user.username,
                        "email":user.email,"birthday":user.birthday,
                        "tup_id":user.tup_id}), 200
    
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500
    

#2 factor authentitcation(otp)
def getotp(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error":"user not found"}), 401
    try:
        token = Otp(email=email, code=str(uuid.uuid4().int)[:6], expires_at=datetime.utcnow() + timedelta(minutes=10))

        token_existing = Otp.query.filter_by(email=email).first()
        if token_existing:
            db.session.delete(token_existing)
            db.session.commit()

        db.session.add(token)
        db.session.commit()    

        msg = Message(
            subject='Your OTP Code',
            sender=Config.MAIL_USERNAME,
            recipients=[email],
        )
        msg.body = f'Your OTP code is: {token.code}. It will expire in 10 minutes.'
        mail.send(msg)
        return jsonify({"response":"otp sent"}), 200
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500


@auth_bp.route('/send-2fa', methods=['POST', 'OPTIONS'])
def sendotp():
    if request.method == 'OPTIONS':
        return ('', 204)
    data = request.get_json() or {}
    email = data.get('email')
    return getotp(email)


@auth_bp.route('/verify-2fa',methods=['POST'])    
def getotpverify():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error":"user not found"}), 401
    try:
        token = Otp.query.filter_by(email=email,code=otp).first()
        if token and not token.is_expired():
            db.session.delete(token)
            db.session.commit()
            access_token = create_access_token(identity=user.id,expires_delta=timedelta(minutes=60))
            return jsonify({"access_token":access_token}), 200
        else:
            return jsonify({"error":"expired or invalid code, resend a new one"}), 401
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"invalid otp"}), 401


#refresh access
@auth_bp.route('/refresh',methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user_id = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user_id,expires_delta=timedelta(minutes=60))
        return jsonify({"access_token":new_access_token}), 200
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500
    

#change password
@auth_bp.route('/forgot-password',methods=['POST'])
def change_password():
    try:
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error":"user not found"}), 401
        
        token = serializer.dumps(email,salt='forgot-password')
        reset_url = f"http://localhost:5173/auth/reset-password/{token}" # hide sa production since ibang url na gamit

        msg = Message(
            subject='reset password',
            sender=Config.MAIL_USERNAME,
            recipients=[email],
        )

        msg.html = f'<p>To reset your password, click the following link:</p><p><a href="{reset_url}">Phishing Link</a></p><p>This link will expire in 1 hour.</p>'
        mail.send(msg)
        return jsonify({"response":"email sent"}), 200
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500
    

#verify link
@auth_bp.route('/reset-password/<token>',methods=['POST'])
def reset_password(token):
    try:
        data = request.get_json()
        
        email = serializer.loads(token,salt='forgot-password',max_age=3600)
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error":"user does not exist"}), 401
        
        user.password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        db.session.commit()
        return jsonify({"response":"password successfully changes"}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}) ,500


@auth_bp.route('/change-password',methods=['POST'])
def change_password_logged():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'error':'User not found'}), 404
        
        if not user.check_password(old_password):
            return jsonify({'error':'Old password is incorrect'}), 401
        
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'response':'Password successfully changed'}), 200
    
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({'error':'Something went wrong'}), 500
    


    
