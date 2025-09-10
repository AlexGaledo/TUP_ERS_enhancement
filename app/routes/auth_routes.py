
from flask import Blueprint, jsonify, request
from ..extensions import db
from ..database.models import User
import logging, traceback
from datetime import datetime

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

        new_user = User(data.get('username'), data.get('password'), data.get('email'), birthday)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"response":"user successfully created",
                        "id":new_user.id,"username":new_user.username,
                        "email":new_user.email,"birthday":new_user.birthday}), 201
    except Exception as e:
        logging.error(traceback.format_exc())
        db.session.rollback()
        return jsonify({"error":"something went wrong"}), 500
    
@auth_bp.route('/sign-in',methods=['POST'])
#signin
def signin():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data.get('email')).first()

        if not user or not user.check_password(data.get('password')):
            return jsonify({'error':'invalid email or password'}), 401
        
        return jsonify({"response":"logged in successfully",
                        "id":user.id,"username":user.username,
                        "email":user.email,"birthday":user.birthday}), 200
    
    except Exception as e:
        logging.error(traceback.format_exc())
        return jsonify({"error":"something went wrong"}, 500)