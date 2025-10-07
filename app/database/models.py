
from ..extensions import db,bcrypt
import uuid



class User(db.Model):
    __tablename__='users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255))
    email = db.Column(db.String(80), unique=True, nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)
    tup_id = db.Column(db.String(36), unique=True, nullable=False)

    def __init__(self,username,password,email,birthday,tup_id):
        self.username = username
        self.password = password
        self.email = email
        self.birthday = birthday
        self.tup_id = tup_id

    def set_password(self,password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self,password):
        return bcrypt.check_password_hash(self.password,password)
    

class Otp(db.Model):
    __tablename__ = 'otps'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    code = db.Column(db.String(6), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)

   


