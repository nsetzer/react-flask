import os,sys

from flask import Flask, render_template, jsonify, url_for

from .index import db, app, cors

from .models.user import User
from .endpoints import user
from .endpoints import test

# serve the bundle
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')

def list_routes():
    output = []
    for rule in app.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        output.append( [rule.endpoint, methods, url] )

    for endpoint, methods, url in sorted(output,key=lambda x:x[2]):
        line = "{:30s} {:20s} {}".format(endpoint, methods, url)

        print(line)
