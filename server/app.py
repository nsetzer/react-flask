from flask import request, render_template, jsonify, url_for, redirect, g

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
#from config import BaseConfig
from flask_bcrypt import Bcrypt
from flask import jsonify
import os,sys

if not os.path.exists("./build"):
    sys.stderr.write("build directory not found\n")

build_dir = os.path.join(os.getcwd(),"build")
static_dir = os.path.join(os.getcwd(),"build", "static")
if not os.path.exists(build_dir):
    sys.stderr.write("build directory not found\n")

sys.stderr.write("%s\n"%build_dir)

app = Flask(__name__,
    static_folder=static_dir,
    template_folder=build_dir)
#app.config.from_object(BaseConfig)
# db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

from sqlalchemy.exc import IntegrityError
#from .models import User
#from .utils.auth import generate_token, requires_auth, verify_token

# serve the bundle
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

#@app.route('/<path:path>', methods=['GET'])
#def any_root_path(path):
#    return render_template('index.html')

@app.route('/api/random', methods=['GET'])
def random_int():
    return jsonify({"value": 4});

#@app.route("/api/user", methods=["GET"])
#@requires_auth
#def get_user():
#    return jsonify(result=g.current_user)


#@app.route("/api/create_user", methods=["POST"])
#def create_user():
#    incoming = request.get_json()
#    user = User(
#        email=incoming["email"],
#        password=incoming["password"]
#    )
#    db.session.add(user)
#
#    try:
#        db.session.commit()
#    except IntegrityError:
#        return jsonify(message="User with that email already exists"), 409
#
#    new_user = User.query.filter_by(email=incoming["email"]).first()
#
#    return jsonify(
#        id=user.id,
#        token=generate_token(new_user)
#    )


#@app.route("/api/get_token", methods=["POST"])
#def get_token():
#    incoming = request.get_json()
#    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
#    if user:
#        return jsonify(token=generate_token(user))
#
#    return jsonify(error=True), 403
#
#
#@app.route("/api/is_token_valid", methods=["POST"])
#def is_token_valid():
#    incoming = request.get_json()
#    is_valid = verify_token(incoming["token"])
#
#    if is_valid:
#        return jsonify(token_is_valid=True)
#    else:
#        return jsonify(token_is_valid=False), 403