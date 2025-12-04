import os
from dotenv import load_dotenv

load_dotenv()

# mga susi
class Config():
    SQLALCHEMY_DATABASE_URI = os.getenv("sql_url", "sqlite:///ers_database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', "dev-secret-key")
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('support_email')
    MAIL_PASSWORD = os.getenv('support_email_password')
    sexpress = os.getenv('express_url')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')


