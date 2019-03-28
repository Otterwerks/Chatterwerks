# This script will wipe the database and build a fresh new template structure
from main import db, User, Thread, Message, Subscription
import time

db.drop_all()
db.create_all()

main_thread = Thread(thread_id = 1, thread_name = "Home", thread_description = "General chat for all users", created_on = time.time())
db.session.add(main_thread)
db.session.commit()