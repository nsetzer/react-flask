
from flask import request, jsonify, g
from flask_cors import cross_origin
from sqlalchemy.exc import IntegrityError

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature

import base64
from bcrypt import gensalt
from ..index import app, db

from ..models.user import User

from .util import requires_auth, verify_token, generate_token

@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    user = g.current_user
    return jsonify(result=user)

@app.route("/api/user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        domain=app.config["DEFAULT_DOMAIN"],
        role=app.config["DEFAULT_ROLE"],
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
