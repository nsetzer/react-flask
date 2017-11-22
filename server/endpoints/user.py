
from functools import wraps
from flask import request, jsonify, g
from flask_cors import cross_origin
from sqlalchemy.exc import IntegrityError

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature

import base64
from bcrypt import gensalt
from ..index import app, db

from ..models.user import User

TWO_WEEKS = 1209600

def generate_basic_token(username, password):
    """convert a username and possword into a basic token"""
    return "Basic " + base64.b64encode(username + ":" + password)

def parse_basic_token(token):
    """return the username and password given a token"""
    if not token.startswith("Basic "):
        raise Exception("Invalid Basic Token")
    return base64.b64decode(token[6:]).split(":")

def generate_token(user, expiration=TWO_WEEKS):
    s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token

def verify_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data

def _requires_token_auth_impl(f, args, kwargs, token):

    user_data = verify_token(token)

    if user_data:
        user = User.get_user_with_email(user_data['email'])
        g.current_user = user
        return f(*args, **kwargs)

    return jsonify(message="Authentication is required to access this resource"), 401

def _requires_basic_auth_impl(f, args, kwargs, token):
    """
    bsic auth enables easy testing

    example:
        curl -u username:password -X GET localhost:4200/api/user

    """
    email, password = parse_basic_token(token)

    user = User.get_user_with_email_and_password(email, password)
    if user:
        g.current_user = user
        return f(*args, **kwargs)

    return jsonify(message="failed to authenticate user %s" % email), 401

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        if "Authorization" not in request.headers:
            return jsonify(message="Authorization not provided"), 401

        token = request.headers.get('Authorization', None)

        if token:
            string_token = token.encode('ascii', 'ignore')
            if token.startswith("Basic "):
                return _requires_basic_auth_impl(f, args, kwargs, string_token)
            return _requires_token_auth_impl(f, args, kwargs, string_token)

        # unreachable?
        return jsonify(message="invalid Authorization header"), 401

    return decorated

@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    user = g.current_user.as_dict()
    # if user is not None:
    #    del user['salt']
    return jsonify(result=user)

@app.route("/api/user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )

@app.route("/api/user/login", methods=["POST"])
def get_token():
    incoming = request.get_json()

    if not incoming:
        return jsonify(error="invalid request body"), 400
    if 'email' not in incoming:
        return jsonify(error="email not specified"), 400
    if 'password' not in incoming:
        return jsonify(error="password not specified"), 400

    user = User.get_user_with_email_and_password(
        incoming["email"], incoming["password"])
    if user:
        app.logger.info('%s logged in successfully', incoming["email"])
        return jsonify(token=generate_token(user))
    else:
        app.logger.warn('%s not found', incoming["email"])
    return jsonify(error="user not found"), 403

@app.route("/api/user/token", methods=["POST"])
@cross_origin(supports_credentials=True)
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])
    return jsonify(token_is_valid=is_valid)
