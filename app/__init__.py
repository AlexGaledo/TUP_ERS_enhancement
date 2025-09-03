from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config


#initialize app
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    return app