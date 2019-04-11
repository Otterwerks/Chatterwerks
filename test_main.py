import main
import pytest
import time
from main import db, User, Thread, Subscription, Message, Get_User_ID, Get_Thread_ID, Get_Subscription_ID, Create_Subscription

test_user_id = -10
test_user_name = "lksjvLDlkVDSLKJv"
test_user_password = "x"

test_thread_id = -10
test_thread_name = "LVIhONEFdlkfjDSVlj"

test_subscription_id = -10

def mock_user(index, name, password):
    db.session.add(User(user_id=index, user_name=name, user_password=password))
    db.session.commit()

def mock_thread(index, name):
    db.session.add(Thread(thread_id=index, thread_name=name))
    db.session.commit()

def mock_subscription(index, user, thread):
    db.session.add(Subscription(subscription_id=index, user_id=user, thread_id=thread))
    db.session.commit()

def delete_user(index):
    del_user = User.query.filter_by(user_id=index).first()
    db.session.delete(del_user)
    db.session.commit()

def delete_thread(index):
    del_thread = Thread.query.filter_by(thread_id=index).first()
    db.session.delete(del_thread)
    db.session.commit()

def delete_subscription(index):
    del_sub = Subscription.query.filter_by(subscription_id=index).first()
    db.session.delete(del_sub)
    db.session.commit()

@pytest.fixture
def client():
    client = main.app.test_client()
    yield client
    
def test_db_read_write(client):
    assert User.query.filter_by(user_id=test_user_id).first() == None
    db.session.add(User(user_id=test_user_id, user_name=test_user_name, user_password=test_user_password))
    db.session.commit()
    assert User.query.filter_by(user_id=test_user_id).first() != None
    assert Thread.query.filter_by(thread_id=test_thread_id).first() == None
    db.session.add(Thread(thread_id=test_thread_id, thread_name=test_thread_name))
    db.session.commit()
    assert Thread.query.filter_by(thread_id=test_thread_id).first() != None
    assert Subscription.query.filter_by(subscription_id=test_subscription_id).first() == None
    db.session.add(Subscription(subscription_id=test_subscription_id, user_id=test_user_id, thread_id=test_thread_id))
    db.session.commit()
    assert Subscription.query.filter_by(subscription_id=test_subscription_id).first() != None
    delete_subscription(test_subscription_id)
    delete_user(test_user_id)
    delete_thread(test_thread_id)

def test_resolve_user(client):
    mock_user(-10, test_user_name, test_user_password)
    assert Get_User_ID(test_user_name, test_user_password) == -10
    assert Get_User_ID(test_user_name + "x", test_user_password) == "id_not_found"  
    delete_user(-10)

def test_resolve_thread(client):
    mock_thread(-10, test_thread_name)
    assert Get_Thread_ID(test_thread_name) == -10
    assert Get_Thread_ID(test_thread_name + "x") == "id_not_found"
    delete_thread(-10)

def test_resolve_subscription(client):
    mock_user(-10, test_user_name, test_user_password)
    mock_thread(-10, test_thread_name)
    mock_subscription(-10, -10, -10)
    assert Get_Subscription_ID(test_user_id, test_thread_id) == -10
    assert Get_Subscription_ID(test_user_id + 1, test_thread_id) == "id_not_found"
    delete_subscription(-10)
    delete_user(-10)
    delete_thread(-10)

def test_create_subscription(client):
    mock_user(-10, test_user_name, test_user_password)
    mock_thread(-10, test_thread_name)
    assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
    Create_Subscription(-10, -10)
    assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() != None
    del_sub = Subscription.query.filter_by(user_id=-10, thread_id=-10).first()
    db.session.delete(del_sub)
    db.session.commit()
    delete_user(-10)
    delete_thread(-10)

def test_login(client):
    mock_user(-10, test_user_name, test_user_password)

    with main.app.test_client() as c:
        rv = c.post('/api/v1/users/login', json={
            'user_name': test_user_name, 'user_password': test_user_password
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        
    with main.app.test_client() as c:
        rv = c.post('/api/v1/users/login', json={
            'user_name': test_user_name, 'user_password': "y"
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'incorrect'

    delete_user(-10)


