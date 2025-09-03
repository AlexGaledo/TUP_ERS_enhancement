

from flask import Flask
from config import Config
from flask_cors import CORS
from flask_jwt_extended import JWTManager



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    return app