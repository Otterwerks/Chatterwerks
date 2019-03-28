# This script will wipe the database and build a fresh new template structure
from main import db, User, Thread, Message, Subscription

db.drop_all()
db.create_all()