
from flask import request, jsonify
from flask_cors import cross_origin
from sqlalchemy.exc import IntegrityError

from ..index import app, db
from ..models.test_message import TestMessage

import random

@app.route('/api/random', methods=['GET'])
def random_int():
    return jsonify({"value": random.randint(0,100)});

"""


curl -X POST -H "Content-Type: application/json" \
     -d '{"message":"hello world"}' \
     http://localhost:4200/api/message

curl -X GET http://localhost:4200/api/message

curl -X DELETE http://localhost:4200/api/message/1

"""
@app.route('/api/message', methods=['POST'])
def create_message():
    incoming = request.get_json()

    if not incoming or "message" not in incoming:
        return "", 400

    print(incoming['message'])
    msg = TestMessage( incoming['message'] )
    db.session.add(msg)

    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(message="failed to insert message"), 409

    return jsonify(id=msg.id)

@app.route('/api/message', methods=['GET'])
def get_all_messages():
    res = TestMessage.get_all_messages()
    res = [x.as_dict() for x in res]
    return jsonify(messages=res)

@app.route('/api/message/<message_id>', methods=['DELETE'])
def delete_message(message_id):

    TestMessage.query.filter_by(id=message_id).delete()

    try:
        db.session.commit()
    except IntegrityError as e:
        return jsonify(message="failed to delete message"), 409

    res = TestMessage.get_all_messages()
    res = [x.as_dict() for x in res]
    return jsonify(messages=res)
