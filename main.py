# py lint: skip-file
import os
import time
from flask import Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from psql_info import psql_uri

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
    user_query = User.query.filter_by(user_name = name, user_password = password).first()
    if user_query is None:
        return "id_not_found"
    else:
        return user_query.user_id

def Get_Subscription_ID(user, thread):
    subscription_query = Subscription.query.filter_by(user_id = user, thread_id = thread).first()
    if subscription_query is None:
        return "id_not_found"
    else:
        return subscription_query.subscription_id
        
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_site(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/api/v1/users/register', methods=['POST'])
def register_user():
    # request body {"user_name": <username>, "user_password": <password>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_exists = User.query.filter_by(user_name = r['user_name']).first()
        if user_exists is None:
            user_to_register = User(user_name=r['user_name'], user_password=r['user_password'], registered_on = time.time())
            db.session.add(user_to_register)
            db.session.commit()
            default_subscription = Subscription(user_id = Get_User_ID(r['user_name'], r['user_password']), thread_id = 1)
            db.session.add(default_subscription)
            db.session.commit()
            return jsonify({"response": "success"})
        else:
            return jsonify({"response": "username_taken"})
    except:
        return jsonify({"response": "failed"})

@app.route('/api/v1/messages/query', methods=['POST'])
def api_message_query():
    # request body {"user_name": <username>, "user_password": <password>, "thread_id": <current thread id>}
    print(request.get_json())
    r=request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        thread_id = r['thread_id']
        if user_id == "id_not_found":
            return redirect("/login", code=302)
        if Get_Subscription_ID(user_id, r['thread_id']) == "id_not_found":
            thread_id = 1
        message_query = Message.query.filter_by(thread_id = thread_id).limit(100).all()
        chat_messages = []
        for message in message_query:
            chat_messages.append({"message_id": message.message_id, "user_id": message.user_id, "message_text": message.message_text, "message_timestamp": message.message_timestamp})
        return jsonify({"thread_id": thread_id, "messages": chat_messages})
    except:
        return jsonify({"response": "failed"})


@app.route('/api/v1/messages/submit', methods=['POST'])
def api_submit():
    # request body {"user_name": <username>, "user_password": <password>, "thread_id": <current thread id>, "message_text": <message>}
    print(request.get_json())
    r = request.get_json()
    try:
        user_id = Get_User_ID(r['user_name'], r['user_password'])
        if user_id == "id_not_found":
            return redirect("/login", code=302)
        message_to_write = Message(user_id=user_id, thread_id=r['thread_id'], message_text=r['text'], message_timestamp = time.time())
        db.session.add(message_to_write)
        db.session.commit()
        return jsonify({"response": "success"})
    except:
        return jsonify({"response": "failed"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="443")