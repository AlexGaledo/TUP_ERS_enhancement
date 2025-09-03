from dotenv import load_dotenv
import os

load_dotenv()

class Config():
    SQLALCHEMY_DATABASE_URI = os.getenv('sql_url')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('jwt_secret_key')


