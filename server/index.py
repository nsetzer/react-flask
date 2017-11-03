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
#app.config.from_object(BaseConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)