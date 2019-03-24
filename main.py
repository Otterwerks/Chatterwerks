# py lint: skip-file
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from psql_info import psql_uri

app = Flask(__name__, static_url_path='/build')
app.config['SQLALCHEMY_DATABASE_URI'] = psql_uri
db = SQLAlchemy(app)

class Message(db.Model):
    message_id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(40), nullable=False)
    text = db.Column(db.String(240), nullable=False)

    def __repr__(self):
        return '<Message_ID %r>' % self.message_id
        
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def static_site(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/api/v1/messages/query', methods=['GET'])

@app.route('/api/v1/messages/submit', methods=['POST'])
def api_submit():
    print(request.get_json())
    r = request.get_json()
    try:
        message_to_write = Message(message_id=r["message_id"], author=r["author"], text=r["text"])
        print("Successful object creation")
        db.session.add(message_to_write)
        print("Successful session add")
        db.session.commit()
        print("Successful session commit")
        return jsonify({"success": "true"})
    except:
        return jsonify({"success": "false"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="443")