import os
from flask import Flask, request, jsonify, g
from flask_pymongo import PyMongo
import json
from redis import Redis

application = Flask(__name__)

application.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']
mongo = PyMongo(application)
db = mongo.db


def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis


@application.route('/')
def index():
    return jsonify(
        status=True,
        message='Welcome to theFlask MongoDB app!'
    )

@application.route('/wow')
def wow():
    return jsonify(
        status=True,
        message='Welcome to theFlask MongoDB app!'
    )

@application.route('/login', methods = ['POST'])
def login():
    data = request.form
    print(data)
    cur = db.user.find({'username':data.get('userName', 'sum')})
    results = list(cur) 
    # Checking the cursor is empty 
    # or not 
    if len(results)==0: 
        return jsonify(
        shouldVote=False,
        message="User does not exist",
        re=data
    )
    else: 
        return jsonify(
        shouldVote=True,
        message="User exist"
    )

@application.route('/register', methods = ['POST'])
def register():
    data = request.form
    cur = db.user.find({'username':data.get('userName', 'sum')})
    results = list(cur) 
    if len(results)>0:
        return jsonify(
        shouldVote=False,
        message="User already exists")
    db.user.insert_one({'username':data.get('userName', ''), 'firstname:' : data.get('firstName', ''), 'lastname:' : data.get('lastName', '')})
    return jsonify(
        shouldVote=True,
        message='User Registered'
    )

@application.route('/vote', methods = ['POST'])
def vote():
    redis = get_redis()
    data = request.form
    print(data)
    option = data.get('option', 'a')
    data = json.dumps({'voter_id': data.get('userName', 'sum'), 'vote': option})
    st = redis.rpush('votes', data)
    return jsonify(
        isVoted=True,
        message='Wow!',
        dat=data,
        stt=st
    )
    

if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)