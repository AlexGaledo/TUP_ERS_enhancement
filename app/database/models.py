
from ..extensions import db,bcrypt
import uuid


class User(db.Model):
    __tablename__='users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255))
    email = db.Column(db.String(80), unique=True, nullable=False)
    birthday = db.Column(db.DateTime, nullable=False)

    def __init__(self,username,password,email,birthday):
        self.username = username
        self.password = password
        self.email = email
        self.birthday = birthday

    def set_password(self,password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self,password):
        return bcrypt.check_password_hash(self.password,password)


