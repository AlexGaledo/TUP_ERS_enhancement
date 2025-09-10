from dotenv import load_dotenv
import os

load_dotenv()

# mga susi
class Config():
    SQLALCHEMY_DATABASE_URI = os.getenv('sql_url')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', "dev-secret-key")
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('support_email')
    MAIL_PASSWORD = os.getenv('support_email_password')


