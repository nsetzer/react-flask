import os, sys
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from config import BaseConfig
from flask_bcrypt import Bcrypt
from flask_cors import CORS

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

if 'DATABASE_URL' in os.environ:
    db_path = os.environ['DATABASE_URL']
else:
    db_path = "sqlite:///" + os.path.join(os.getcwd(), "temp.db")
app.config['SQLALCHEMY_DATABASE_URI'] =  db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
print(app.config['SQLALCHEMY_DATABASE_URI'])

app.config['SECRET_KEY'] = "secret"

#app.config.from_object(BaseConfig)
db     = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cors   = CORS(app, resources={r"/api/*": {"origins": "*"}})