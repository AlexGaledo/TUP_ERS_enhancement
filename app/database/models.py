
from ..extensions import db,bcrypt
import uuid



class User(db.Model):
    __tablename__='users'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255))
    email = db.Column(db.String(80), unique=True, nullable=False)
    birthday = db.Column(db.DateTime, nullable=True)
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
    

class personalInfo(db.Model):
    __tablename__ = 'personal_information'
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, primary_key=True)
    address = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    emergency_contact = db.Column(db.String(255), nullable=True)
    firstname = db.Column(db.String(80), nullable=True)
    lastname = db.Column(db.String(80), nullable=True)
    middlename = db.Column(db.String(80), nullable=True)
    extension_name = db.Column(db.String(10), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    campus = db.Column(db.String(80), nullable=True)
    department = db.Column(db.String(80), nullable=True)
    course = db.Column(db.String(80), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    facebook_link = db.Column(db.String(255), nullable=True)
    birthplace = db.Column(db.String(255), nullable=True)
    height_cm = db.Column(db.Float, nullable=True)
    weight_lbs = db.Column(db.Float, nullable=True)
    citizenship = db.Column(db.String(80), nullable=True)
    religion = db.Column(db.String(80), nullable=True)
    civil_status = db.Column(db.String(80), nullable=True)
    lrn = db.Column(db.String(20), nullable=True)


class familyBackground(db.Model):
    __tablename__ = 'family_background'
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, primary_key=True)
    father_name = db.Column(db.String(255), nullable=True)
    father_occupation = db.Column(db.String(255), nullable=True)
    father_contact = db.Column(db.String(20), nullable=True)
    father_highest_education = db.Column(db.String(255), nullable=True)
    father_employer = db.Column(db.String(255), nullable=True)
    father_employer_address = db.Column(db.String(255), nullable=True)
    father_income_bracket = db.Column(db.String(255), nullable=True)

    mother_name = db.Column(db.String(255), nullable=True)
    mother_occupation = db.Column(db.String(255), nullable=True)
    mother_contact = db.Column(db.String(20), nullable=True)
    mother_highest_education = db.Column(db.String(255), nullable=True)
    mother_employer = db.Column(db.String(255), nullable=True)
    mother_employer_address = db.Column(db.String(255), nullable=True)
    mother_income_bracket = db.Column(db.String(255), nullable=True)

    guardian_name = db.Column(db.String(255), nullable=True)
    guardian_occupation = db.Column(db.String(255), nullable=True)
    guardian_contact = db.Column(db.String(20), nullable=True)
    guardian_highest_education = db.Column(db.String(255), nullable=True)
    guardian_employer = db.Column(db.String(255), nullable=True)
    guardian_employer_address = db.Column(db.String(255), nullable=True)
    guardian_income_bracket = db.Column(db.String(255), nullable=True)

    number_of_siblings = db.Column(db.Integer, nullable=True)
    income_bracket = db.Column(db.String(255), nullable=True)


class Otp(db.Model):
    __tablename__ = 'otps'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    code = db.Column(db.String(6), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)



   


