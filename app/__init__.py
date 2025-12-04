from flask import Flask, request
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate, bcrypt, mail
from flask_jwt_extended import JWTManager


#initialize app
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # Configure CORS to allow Vite dev server origin and handle preflights
    CORS(app)
    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    mail.init_app(app)
    from .database import models
    from .routes import register_routes
    register_routes(app)
    JWTManager(app)
    from .extensions import serializer

    @app.after_request
    def add_cors_headers(response):
        # Ensure preflight responses are correct
        origin = request.headers.get('Origin')
        allowed_origins = [
            'http://localhost:5173',
            'https://tup-ers-enhancement.vercel.app'
        ]
        if origin in allowed_origins:
            response.headers['Access-Control-Allow-Origin'] = origin
        response.headers.setdefault('Access-Control-Allow-Credentials', 'true')
        response.headers.setdefault('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.setdefault('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        return response

    # #initializedsqlite
    # with app.app_context():
    #     db.create_all()
        
    return app