# This script will wipe the database and build a fresh new template structure
from main import db, User, Thread, Message, Subscription
import time
from otter_pass import otter_pass

db.drop_all()
db.create_all()

try:
    main_thread = Thread(thread_id = 1, thread_name = "Home", thread_description = "General chat for all users", created_on = time.time())
    db.session.add(main_thread)
    db.session.commit()
    create_otter = User(user_id = -1, user_name = "Otter", user_password = otter_pass)
    db.session.add(create_otter)
    db.session.commit()
    subscribe_otter = Subscription(subscription_id = -1, user_id = -1, thread_id = 1)
    db.session.add(subscribe_otter)
    db.session.commit()
    print("complete")
except:
    print("error")