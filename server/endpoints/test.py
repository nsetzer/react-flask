
from flask import request, jsonify
from flask_cors import cross_origin

from ..index import app, db

import random

@app.route('/api/random', methods=['GET'])
def random_int():
    return jsonify({"value": random.randint(0,100)});

