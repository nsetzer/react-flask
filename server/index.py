import os, sys
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

import logging
from logging.handlers import RotatingFileHandler

class BaseConfig(object):

    def __init__(self):
        super(BaseConfig,self).__init__()

        self.setenv_default("DEBUG",False)
        #self.setenv_default("PORT",4200)
        self.setenv_default("SECRET_KEY","SECRET")
        self.setenv_default("DATABASE_URL",
            "sqlite:///" + os.path.join(os.getcwd(), "app.db"))

        self.build_dir = os.path.join(os.getcwd(),"build")
        self.static_dir = os.path.join(os.getcwd(),"build", "static")

    def setenv_default(self, env, default):
        if env in os.environ:
            self.__dict__[env] = os.environ[env]
        else:
            self.__dict__[env] = default

cfg = BaseConfig();

app = Flask(__name__,
    static_folder=cfg.static_dir,
    template_folder=cfg.build_dir)

#handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
#handler.setLevel(logging.INFO)
#app.logger.addHandler(handler)

app.logger.addHandler(logging.StreamHandler())
app.logger.setLevel(logging.INFO)


app.logger.info("database: %s", cfg.DATABASE_URL)

app.config['SQLALCHEMY_DATABASE_URI'] =  cfg.DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = cfg.SECRET_KEY

db     = SQLAlchemy(app)
bcrypt = Bcrypt(app)
cors   = CORS(app, resources={r"/api/*": {"origins": "*"}})

if not os.path.exists(cfg.build_dir):
    # only an error in production environments
    app.logger.warn("build directory not found\n")