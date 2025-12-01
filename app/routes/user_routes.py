from flask import request,jsonify,Blueprint
from ..services.gemini import generate_response


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