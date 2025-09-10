from dotenv import load_dotenv
import os

load_dotenv()

# mga susi
class Config():
    SQLALCHEMY_DATABASE_URI = os.getenv('sql_url')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


