from ..index import db, bcrypt


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        # Note:
        # I had an error in python3 related to this function
        # AttributeError: 'module' object has no attribute 'ffi'
        # I uninstalled bcrypt py-bcrypt flask_bcrypt
        # then reinstalled flask_bcrypt using pip
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                return user
        return None