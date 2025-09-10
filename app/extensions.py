
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from .config import Config

db= SQLAlchemy()
bcrypt = Bcrypt()
migrate = Migrate()
mail = Mail()
serializer = URLSafeTimedSerializer(Config.SECRET_KEY)

    