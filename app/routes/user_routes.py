from flask import request,jsonify,Blueprint
from ..services.gemini import generate_response
from ..extensions import db
from ..database.models import User,personalInfo,familyBackground
from sqlalchemy import func
import logging, traceback


user_bp = Blueprint('user_bp',__name__)

#chatbot
@user_bp.route('/chatbot',methods=['POST'])
def chatbot():
    try:
        data = request.get_json() or {}
        message = data.get('message','')
        if not message:
            return jsonify({'error':'message is required'}), 400
        
        # Simple echo response for demonstration
        response_message = generate_response(message)
        
        return jsonify({'response':response_message}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@user_bp.route('/retrieve-info',methods=['POST'])
def retrieve_info():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        email = data.get('email')
        tup = data.get('tup_id')

        if not user_id and not email and not tup:
            return jsonify({'error':'provide user_id or email or tup_id'}), 400

        user = None
        if user_id:
            user = User.query.filter_by(id=user_id).first()
        if not user and email:
            try:
                user = User.query.filter(func.lower(User.email) == email.lower()).first() # type: ignore
            except Exception:
                user = User.query.filter_by(email=email).first()
        if not user and tup:
            user = User.query.filter_by(tup_id=tup.lower()).first()
        if not user:
            return jsonify({'error':'User not found'}), 404
        
        # Always use the resolved user's id to fetch related records
        resolved_user_id = user.id
        personalInfo_data = personalInfo.query.filter_by(user_id=resolved_user_id).first()
        familyBackground_data = familyBackground.query.filter_by(user_id=resolved_user_id).first()

        personal_info = {
                'address': personalInfo_data.address if personalInfo_data else None,
                'phone_number': personalInfo_data.phone_number if personalInfo_data else None,
                'emergency_contact': personalInfo_data.emergency_contact if personalInfo_data else None,
                'firstname': personalInfo_data.firstname if personalInfo_data else None,
                'lastname': personalInfo_data.lastname if personalInfo_data else None,
                'middlename': personalInfo_data.middlename if personalInfo_data else None,
                'extension_name': personalInfo_data.extension_name if personalInfo_data else None,
                'gender': personalInfo_data.gender if personalInfo_data else None,
                'campus': personalInfo_data.campus if personalInfo_data else None,
                'department': personalInfo_data.department if personalInfo_data else None,
                'course': personalInfo_data.course if personalInfo_data else None,
                'age': personalInfo_data.age if personalInfo_data else None,
                'facebook_link': personalInfo_data.facebook_link if personalInfo_data else None,
                'birthplace': personalInfo_data.birthplace if personalInfo_data else None,
                'height_cm': personalInfo_data.height_cm if personalInfo_data else None,
                'weight_lbs': personalInfo_data.weight_lbs if personalInfo_data else None,
                'citizenship': personalInfo_data.citizenship if personalInfo_data else None,
                'religion': personalInfo_data.religion if personalInfo_data else None,
                'civil_status': personalInfo_data.civil_status if personalInfo_data else None,
                'lrn': personalInfo_data.lrn if personalInfo_data else None
        }

        family_background = {
                'father_name': familyBackground_data.father_name if familyBackground_data else None,
                'father_occupation': familyBackground_data.father_occupation if familyBackground_data else None,
                'father_contact': familyBackground_data.father_contact if familyBackground_data else None,
                'father_highest_education': familyBackground_data.father_highest_education if familyBackground_data else None,
                'father_employer': familyBackground_data.father_employer if familyBackground_data else None,
                'father_employer_address': familyBackground_data.father_employer_address if familyBackground_data else None,
                'father_income_bracket': familyBackground_data.father_income_bracket if familyBackground_data else None,
                'mother_name': familyBackground_data.mother_name if familyBackground_data else None,
                'mother_occupation': familyBackground_data.mother_occupation if familyBackground_data else None,
                'mother_contact': familyBackground_data.mother_contact if familyBackground_data else None,
                'mother_highest_education': familyBackground_data.mother_highest_education if familyBackground_data else None,
                'mother_employer': familyBackground_data.mother_employer if familyBackground_data else None,
                'mother_employer_address': familyBackground_data.mother_employer_address if familyBackground_data else None,
                'mother_income_bracket': familyBackground_data.mother_income_bracket if familyBackground_data else None,
                'guardian_name': familyBackground_data.guardian_name if familyBackground_data else None,
                'guardian_occupation': familyBackground_data.guardian_occupation if familyBackground_data else None,
                'guardian_contact': familyBackground_data.guardian_contact if familyBackground_data else None,
                'guardian_highest_education': familyBackground_data.guardian_highest_education if familyBackground_data else None,
                'guardian_employer': familyBackground_data.guardian_employer if familyBackground_data else None,
                'guardian_employer_address': familyBackground_data.guardian_employer_address if familyBackground_data else None,
                'guardian_income_bracket': familyBackground_data.guardian_income_bracket if familyBackground_data else None,
                'number_of_siblings': familyBackground_data.number_of_siblings if familyBackground_data else None,
                'income_bracket': familyBackground_data.income_bracket if familyBackground_data else None
        }
        
        return jsonify({
            'user_id': user.id,
            'email': user.email,
            'personal_info': personal_info,
            'family_background': family_background
        }), 200
    
    except Exception as e:
        logging.error(f"Error retrieving user info: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
        
@user_bp.route('/update-info',methods=['POST'])
def update_info():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        if not user_id:
            return jsonify({'error':'user_id is required'}), 400
        
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'error':'User not found'}), 404
        
        personal_info_data = data.get('personal_info',{})
        family_background_data = data.get('family_background',{})
        
        # Fetch or create personal info
        personal_info = personalInfo.query.filter_by(user_id=user_id).first()
        if not personal_info:
            personal_info = personalInfo(user_id=user_id) #type: ignore
            db.session.add(personal_info)

        for key, value in personal_info_data.items():
            if hasattr(personal_info, key):
                setattr(personal_info, key, value)
        
        # Fetch or create family background
        family_background = familyBackground.query.filter_by(user_id=user_id).first()
        if not family_background:
            family_background = familyBackground(user_id=user_id) #type: ignore
            db.session.add(family_background)

        for key, value in family_background_data.items():
            if hasattr(family_background, key):
                setattr(family_background, key, value)
        
        db.session.commit()
        
        return jsonify({'message':'User information updated successfully'}), 200
    
    except Exception as e:
        logging.error(f"Error updating user info: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
