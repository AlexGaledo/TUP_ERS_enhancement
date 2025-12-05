
import os, uuid, re
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
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from ..services.totp_service import TOTPService



auth_bp = Blueprint('auth_bp',__name__)


def validate_password(password):

    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)"
    return True, "Password is valid"


#signup
@auth_bp.route("/sign-up",methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if User.query.filter_by(email=data.get('email')).first()\
            or User.query.filter_by(username=data.get('username')).first():
            return jsonify({"error":"Username already exists"}), 409
        
        # Validate password
        password = data.get('password')
        is_valid, message = validate_password(password)
        if not is_valid:
            return jsonify({"error": message}), 400
        
        raw_bday = data.get('bday')
        birthday = datetime.strptime(raw_bday, '%Y-%m-%d') if raw_bday else None
        tupid = data.get('tup_id').lower()

        new_user = User(
            data.get('username'),
            password,
            data.get('email'),
            birthday,
            tupid
        )
        new_user.set_password(password)
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
        totp_code = data.get('totp_code')  # Optional TOTP code
        
        user = User.query.filter_by(tup_id=tup_key).first()
        
        if not user or not user.check_password(data.get('password')):
            return jsonify({'error':'invalid tup id or password'}), 401
        
        # If user has TOTP enabled, require verification
        if user.totp_enabled:
            if not totp_code:
                return jsonify({
                    "totp_required": True,
                    "email": user.email,
                    "message": "TOTP verification required"
                }), 403
            
            # Verify TOTP code
            if not TOTPService.verify_totp(user.totp_secret, totp_code):
                return jsonify({'error': 'Invalid authenticator code'}), 401
        
        return jsonify({"id":user.id,"username":user.username,
                        "email":user.email,"birthday":user.birthday,
                        "profile_url":user.profile_url,
                        "tup_id":user.tup_id}), 200
    
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500
    

def _send_otp_email_via_resend(email: str, code: str) -> tuple[bool, str]:
    """Send OTP using Resend HTTPS API to avoid SMTP restrictions on PaaS."""
    api_key = os.getenv('RESEND_API_KEY')
    from_addr = os.getenv('RESEND_FROM', 'onboarding@resend.dev')
    if not api_key:
        return False, 'RESEND_API_KEY not configured'
    try:
        import requests as _req
        resp = _req.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
            },
            json={
                'from': from_addr,
                'to': [email],
                'subject': 'Your OTP Code',
                'html': f'<p>Your OTP code is <strong>{code}</strong>. It will expire in 10 minutes.</p>',
            },
            timeout=15,
        )
        if 200 <= resp.status_code < 300:
            return True, 'sent'
        return False, f'Resend error {resp.status_code}: {resp.text[:200]}'
    except Exception as e:
        return False, str(e)


#2 factor authentitcation(otp) smtp
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

        # Prefer Resend (HTTPS). If not configured, try Flask-Mail as fallback.
        ok, err = _send_otp_email_via_resend(email, token.code)
        if not ok:
            try:
                msg = Message(
                    subject='Your OTP Code',
                    sender=Config.MAIL_USERNAME,
                    recipients=[email],
                )
                msg.body = f'Your OTP code is: {token.code}. It will expire in 10 minutes.'
                mail.send(msg)
            except Exception:
                logging.error(f"Resend failed and SMTP fallback failed: {err}\n{traceback.format_exc()}")
                # Dev fallback: expose OTP so flow is unblocked in non-prod
                if app_env := os.getenv('FLASK_ENV', 'production') != 'production':
                    return jsonify({"response":"otp generated (dev mode)", "otp": token.code, "dev": True}), 200
                return jsonify({"error":"unable to send otp"}), 502
        return jsonify({"response":"otp sent"}), 200
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500

#resend
# def getotp_2(email):
#     import resend
#     resend.api_key = Config.RESEND_API_KEY

#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error":"user not found"}), 401
#     try:
#         token = Otp(email=email, code=str(uuid.uuid4().int)[:6], expires_at=datetime.utcnow() + timedelta(minutes=10))

#         token_existing = Otp.query.filter_by(email=email).first()
#         if token_existing:
#             db.session.delete(token_existing)
#             db.session.commit()

#         db.session.add(token)
#         db.session.commit() 

#         r = resend.Emails.send({
#         "from": "onboarding@resend.dev",
#         "to": email,
#         "subject": "Hello World",
#         "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
#         })
#         return jsonify({"response":"otp sent"}), 200
#     except Exception as e:
#         logging.error(traceback.format_exc())
#         return jsonify({"error":"something went wrong"}), 500

#brevo
def getotp_3(email):
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
    
        subject = "Your OTP Code"
        html_content = f"<p>Your OTP code is: <strong>{token.code}</strong>. It will expire in 10 minutes.</p>"
        send_brevo_message(email, subject, html_content)
        return jsonify({"response":"otp sent"}), 200
    except ApiException as e:
        logging.error(f"Brevo ApiException: {e}")
        return jsonify({"error":"failed to send otp via brevo"}), 502
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}), 500



@auth_bp.route('/send-2fa', methods=['POST', 'OPTIONS'])
def sendotp():
    if request.method == 'OPTIONS':
        # Return 200 for preflight to keep clients happy
        return ('', 200)
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    if not email:
        return jsonify({"error": "email is required"}), 400
    return getotp_3(email)


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
@auth_bp.route('/check-totp-status', methods=['POST'])
def check_totp_status():
    """
    Check if a user has TOTP enabled (public endpoint for forgot password flow)
    """
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        user = User.query.filter_by(email=email).first()
        if not user:
            # Don't reveal if user exists or not for security
            return jsonify({"totp_enabled": False}), 200
        
        return jsonify({"totp_enabled": user.totp_enabled}), 200
        
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error": "Something went wrong"}), 500


#brevo send message
def send_brevo_message(email, subject, html_content):
    try:
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = Config.BREVO_API_KEY
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )
        email_data = sib_api_v3_sdk.SendSmtpEmail(
            sender={"name": "tup ers enhancement", "email": "group1.ers.recovery@gmail.com"},
            to=[{"email": email}],
            subject=subject,
            html_content=html_content
        )
        response = api_instance.send_transac_email(email_data)
        logging.info(f"Brevo email sent: {response}")
        return True
    except ApiException as e:
        logging.error(f"Brevo ApiException: {e}")
        return False
    

@auth_bp.route('/forgot-password',methods=['POST'])
def change_password():
    try:
        data = request.get_json()
        email = data.get('email')
        totp_code = data.get('totp_code')  # Optional TOTP code
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error":"user not found"}), 401
        
        # If user has TOTP enabled, require verification before sending reset link
        if user.totp_enabled:
            if not totp_code:
                return jsonify({
                    "error": "TOTP code required",
                    "totp_required": True
                }), 403
            
            # Verify TOTP code
            if not TOTPService.verify_totp(user.totp_secret, totp_code):
                return jsonify({"error": "Invalid TOTP code"}), 401
            
            # TOTP verified, send reset link via Brevo
            token = serializer.dumps(email,salt='forgot-password')
            reset_url = f"https://tup-ers-enhancement.vercel.app/auth/reset-password/{token}"

            subject = "Password Reset Request"
            html_content = f"""<p>To reset your password, click the following link:</p>
                               <a href="{reset_url}">{reset_url}</a>
                               <p>This link will expire in 1 hour.</p>
            """
            send_brevo_message(email, subject, html_content)
            return jsonify({"response":"email sent"}), 200
        else:
            # TOTP not enabled: User must verify via email OTP first (handled by /auth/send-2fa and /auth/verify-2fa)
            # After OTP verification, frontend will call this endpoint again to get reset link
            # So we just send the reset link here via Brevo
            token = serializer.dumps(email,salt='forgot-password')
            reset_url = f"https://tup-ers-enhancement.vercel.app/auth/reset-password/{token}"
            
            subject = "Password Reset Request"
            html_content = f"""<p>To reset your password, click the following link:</p>
                               <a href="{reset_url}">{reset_url}</a>
                               <p>This link will expire in 1 hour.</p>
            """
            send_brevo_message(email, subject, html_content)
            return jsonify({"response":"reset link sent"}), 200
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
        
        # Validate new password
        new_password = data.get('password')
        is_valid, message = validate_password(new_password)
        if not is_valid:
            return jsonify({"error": message}), 400
        
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
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
        
        # Validate new password
        is_valid, message = validate_password(new_password)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({'response':'Password successfully changed'}), 200
    
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({'error':'Something went wrong'}), 500


# ========== TOTP/Google Authenticator Routes ==========

@auth_bp.route('/totp/setup', methods=['POST'])
@jwt_required()
def setup_totp():
    """
    Generate TOTP secret and QR code for user to enable Google Authenticator
    """
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Generate new secret
        secret = TOTPService.generate_secret()
        
        # Generate QR code and get manual entry code
        qr_code, manual_code = TOTPService.get_setup_data(secret, user.email)
        
        # Store secret temporarily (not enabled yet until verified)
        user.totp_secret = secret
        db.session.commit()
        
        return jsonify({
            'qr_code': qr_code,
            'manual_code': manual_code,
            'email': user.email
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Something went wrong'}), 500


@auth_bp.route('/totp/enable', methods=['POST'])
@jwt_required()
def enable_totp():
    """
    Verify TOTP code and enable Google Authenticator for user
    """
    try:
        data = request.get_json()
        totp_code = data.get('totp_code')
        
        if not totp_code:
            return jsonify({'error': 'TOTP code is required'}), 400
        
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if not user.totp_secret:
            return jsonify({'error': 'TOTP not set up. Please generate QR code first'}), 400
        
        # Verify the TOTP code
        if not TOTPService.verify_totp(user.totp_secret, totp_code):
            return jsonify({'error': 'Invalid TOTP code'}), 401
        
        # Enable TOTP
        user.totp_enabled = True
        db.session.commit()
        
        return jsonify({'response': 'Google Authenticator enabled successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Something went wrong'}), 500


@auth_bp.route('/totp/disable', methods=['POST'])
@jwt_required()
def disable_totp():
    """
    Disable Google Authenticator for user
    """
    try:
        data = request.get_json()
        password = data.get('password')
        totp_code = data.get('totp_code')
        
        if not password or not totp_code:
            return jsonify({'error': 'Password and TOTP code are required'}), 400
        
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verify password
        if not user.check_password(password):
            return jsonify({'error': 'Incorrect password'}), 401
        
        # Verify TOTP code
        if user.totp_enabled and not TOTPService.verify_totp(user.totp_secret, totp_code):
            return jsonify({'error': 'Invalid TOTP code'}), 401
        
        # Disable TOTP
        user.totp_enabled = False
        user.totp_secret = None
        db.session.commit()
        
        return jsonify({'response': 'Google Authenticator disabled successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Something went wrong'}), 500


@auth_bp.route('/totp/status', methods=['GET'])
@jwt_required()
def totp_status():
    """
    Check if user has TOTP enabled
    """
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'totp_enabled': user.totp_enabled,
            'has_totp_secret': user.totp_secret is not None
        }), 200
        
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Something went wrong'}), 500


@auth_bp.route('/totp/verify', methods=['POST'])
def verify_totp_for_reset():
    """
    Verify TOTP code during password reset flow
    """
    try:
        data = request.get_json()
        email = data.get('email')
        totp_code = data.get('totp_code')
        
        if not email or not totp_code:
            return jsonify({'error': 'Email and TOTP code are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        if not user.totp_enabled:
            return jsonify({'error': 'TOTP not enabled for this user'}), 400
        
        # Verify TOTP code
        if not TOTPService.verify_totp(user.totp_secret, totp_code):
            return jsonify({'error': 'Invalid TOTP code'}), 401
        
        return jsonify({'response': 'TOTP verified successfully'}), 200
        
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({'error': 'Something went wrong'}), 500
    


    
