# py lint: skip-file
import os
import time
from flask import Flask, send_from_directory, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from psql_info import psql_uri
from virtual_otter import Otter

app = Flask(__name__, static_url_path='/build')
app.config['SQLALCHEMY_DATABASE_URI'] = psql_uri
#app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(16), nullable=False)
    user_password = db.Column(db.Text, nullable=False)
    registered_on = db.Column(db.Integer)
    last_login = db.Column(db.Integer)

    def __repr__(self):
        return '<User_ID %r>' % self.user_id

class Thread(db.Model):
    thread_id = db.Column(db.Integer, primary_key=True)
    thread_name = db.Column(db.String)
    thread_description = db.Column(db.Text)
    thread_moderator = db.Column(db.String)
    created_on = db.Column(db.Integer)

    def __repr__(self):
        return '<Thread_ID %r>' % self.thread_id

class Message(db.Model):
    message_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.thread_id'), nullable=False)
    message_text = db.Column(db.Text, nullable=False)
    message_timestamp = db.Column(db.Integer)

    def __repr__(self):
        return '<Message_ID %r>' % self.message_id

class Subscription(db.Model):
    subscription_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.thread_id'), nullable=False)
    subscribed_on = db.Column(db.Integer)

    def __repr__(self):
        return '<Subscription_ID %r>' % self.subscription_id

def Get_User_ID(name, password):
    user_query = User.query.filter_by(user_name=name, user_password=password).first()
    if user_query is None:
        return "id_not_found"
    else:
        return user_query.user_id

def Get_Thread_ID(thread_name):
    thread_query = Thread.query.filter_by(thread_name=thread_name).first()
    if thread_query is None:
        return "id_not_found"
    else:
        return thread_query.thread_id

def Get_Subscription_ID(user, thread):
    subscription_query = Subscription.query.filter_by(user_id=user, thread_id=thread).first()
    if subscription_query is None:
        return "id_not_found"
    else:
        return subscription_query.subscription_id

def Create_Subscription(user_id, thread_id):
    new_subscription = Subscription(user_id=user_id, thread_id=thread_id)
    db.session.add(new_subscription)
    db.session.commit()
        
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_site(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

@app.route("/api/v1/users/login", methods=['POST'])
def api_login_user():
    # request body {"user_name": <username>, "user_password": <password>}
    print(request.get_json())
    r = request.get_json()
    try:
        check_login = Get_User_ID(r['user_name'], r['user_password'])
        if check_login == "id_not_found":
            return jsonify({"response": "incorrect"})
        else:
            return jsonify({"response": "success"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/users/register', methods=['POST'])
def api_register_user():
    # request body {"user_name": <username>, "user_password": <password>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_exists = User.query.filter_by(user_name=r['user_name']).first()
        if user_exists is None:
            user_to_register = User(user_name=r['user_name'], user_password=r['user_password'], registered_on=time.time())
            db.session.add(user_to_register)
            db.session.commit()
            default_subscription = Subscription(user_id=Get_User_ID(r['user_name'], r['user_password']), thread_id=1)
            db.session.add(default_subscription)
            db.session.commit()
            otter_welcome = Message(user_id=-1, thread_id=1, message_text="Welcome to the chat, " + r['user_name'])
            db.session.add(otter_welcome)
            db.session.commit()
            return jsonify({"response": "success"})
        else:
            return jsonify({"response": "username_taken"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/messages/query', methods=['POST'])
def api_message_query():
    # request body {"user_name": <username>, "user_password": <password>, "thread_name": <current thread name>}
    print(request.get_json())
    r=request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        thread_id = Get_Thread_ID(r['thread_name'])
        if user_id == "id_not_found" or thread_id == "id_not_found":
            return redirect("/login", code=302)
        if Get_Subscription_ID(user_id, thread_id) == "id_not_found":
            thread_id = 1
        message_query = Message.query.filter_by(thread_id=thread_id).limit(100).all()
        users_query = Subscription.query.filter_by(thread_id=thread_id).all()
        chat_messages = []
        for message in message_query:
            chat_messages.append({"message_id": message.message_id, "user_name": User.query.filter_by(user_id=message.user_id).first().user_name, "message_text": message.message_text, "message_timestamp": message.message_timestamp})
        subscribed_users = []
        for user in users_query:
            subscribed_users.append(User.query.filter_by(user_id=user.user_id).first().user_name)
        subscriptions = Subscription.query.filter_by(user_id=user_id).all()
        threads_subscribed_to = []
        for thread in subscriptions:
            threads_subscribed_to.append(Thread.query.filter_by(thread_id=thread.thread_id).first().thread_name)
        return jsonify({"response": "success", "thread_name": Thread.query.filter_by(thread_id=thread_id).first().thread_name, "subscribed_users": subscribed_users, "threads": threads_subscribed_to, "messages": chat_messages})
    except:
        return jsonify({"response": "failed"})


@app.route('/api/v1/messages/submit', methods=['POST'])
def api_submit_message():
    # request body {"user_name": <username>, "user_password": <password>, "thread_name": <current thread name>, "message_text": <message>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        thread_id = Get_Thread_ID(r['thread_name'])
        if user_id == "id_not_found" or thread_id == "id_not_found":
            return redirect("/login", code=302)
        message_to_write = Message(user_id=user_id, thread_id=thread_id, message_text=r['text'], message_timestamp=time.time())
        db.session.add(message_to_write)
        db.session.commit()
        if thread_id == 1:
            otter_listen = Otter(r['text']).interpret()
            if otter_listen is not None:
                otter_answer = Message(user_id=-1, thread_id=1, message_text=otter_listen, message_timestamp=time.time())
                db.session.add(otter_answer)
                db.session.commit()

        return jsonify({"response": "success"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/threads/new', methods=['POST'])
def api_new_thread():
    #request body {"user_name": <username>, "user_password": <password>, "thread_name": <name>, "thread_description": <description>, "initial_subscriptions": <[username list]>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        if user_id == "id_not_found":
            return redirect("/login", code=302)
        if Thread.query.filter_by(thread_name=r['thread_name']).first() is None:
            new_thread = Thread(thread_name=r['thread_name'], thread_description=r['thread_description'], thread_moderator=user_id)
            db.session.add(new_thread)
            db.session.commit()
            thread_id = Get_Thread_ID(r['thread_name'])
            Create_Subscription(user_id, thread_id)
            for user in r['initial_subscriptions']:
                user_id_to_subscribe = User.query.filter_by(user_name=user).first().user_id
                if user_id_to_subscribe != user_id:
                    Create_Subscription(user_id_to_subscribe, thread_id)
            return jsonify({"response": "success"})
        else:
            return jsonify({"response": "exists"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/threads/subscribe', methods=['POST'])
def api_new_subscription():
    #request body {"user_name": <username>, "user_password": <password>, "thread_to_subscribe": <threadname>, "user_to_subscribe": <username>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        thread_id = Get_Thread_ID(r['thread_to_subscribe'])
        id_to_subscribe = User.query.filter_by(user_name=r['user_to_subscribe']).first().user_id
        if user_id == "id_not_found" or id_to_subscribe == None or thread_id == "id_not_found":
            return jsonify({"response": "query error"})
        if user_id != Thread.query.filter_by(thread_id=thread_id).first().thread_moderator:
            return jsonify({"response": "permission denied"})
        Create_Subscription(id_to_subscribe, thread_id)
        return jsonify({"response": "success"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/threads/getSubscriptions', methods=['POST'])
def api_get_subscriptions():
    #request body {"user_name": <username>, "user_password": <password>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        if user_id == "id_not_found":
            return redirect("/login", code=302)
        subscriptions = Subscription.query.filter_by(user_id=user_id).all()
        threads_subscribed_to = []
        for thread in subscriptions:
            threads_subscribed_to.append(Thread.query.filter_by(thread_id=thread.thread_id).first().thread_name)
        return jsonify({"response": "success", "threads": threads_subscribed_to})
    except:
        return jsonify({"response": "failed"})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port="443")
