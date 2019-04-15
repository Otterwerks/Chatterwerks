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
    
def mock_message(index, user, thread, text):
    db.session.add(Message(message_id=index, user_id=user, thread_id=thread, message_text=text))
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
    
def delete_message(index):
    del_mes = Message.query.filter_by(message_id=index).first()
    db.session.delete(del_mes)
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

def test_user_login(client):
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
    
def test_user_register(client):
    assert User.query.filter_by(user_name=test_user_name, user_password=test_user_password).first() == None
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/users/register', json={
            'user_name': test_user_name, 'user_password': test_user_password
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert User.query.filter_by(user_name=test_user_name, user_password=test_user_password).first() != None


    with main.app.test_client() as c:
        rv = c.post('/api/v1/users/register', json={
            'user_name': test_user_name, 'user_password': test_user_password
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'username_taken'


    delete_subscription(Subscription.query.filter_by(user_id=(User.query.filter_by(user_name=test_user_name).first().user_id)).first().subscription_id)
    delete_user(User.query.filter_by(user_name=test_user_name, user_password=test_user_password).first().user_id)
    
def test_new_thread(client):
    mock_user(-10, test_user_name, test_user_password)
    assert Thread.query.filter_by(thread_name=test_thread_name).first() == None
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/new', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': test_thread_name, 'thread_description': 'X', 'initial_subscriptions': []
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert Thread.query.filter_by(thread_name=test_thread_name).first() != None
        
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/new', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': test_thread_name, 'thread_description': 'X', 'initial_subscriptions': []
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'exists'
        
    delete_subscription(Subscription.query.filter_by(user_id=-10).first().subscription_id)
    delete_user(-10)
    delete_thread(Thread.query.filter_by(thread_name=test_thread_name).first().thread_id)
    
def test_new_subscription(client):
    mock_user(-10, test_user_name, test_user_password)
    db.session.add(Thread(thread_id=test_thread_id, thread_name=test_thread_name, thread_moderator=test_user_name))
    db.session.commit()
    
    assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/subscribe', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_to_subscribe': test_thread_name, 'user_to_subscribe': test_user_name
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() != None
        
    delete_subscription(Subscription.query.filter_by(user_id=-10, thread_id=-10).first().subscription_id)
    
    # invalid user credentials test
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/subscribe', json={
            'user_name': (test_user_name + "X"), 'user_password': test_user_password, 'thread_to_subscribe': test_thread_name, 'user_to_subscribe': test_user_name
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'query error'
        assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
        
    # invalid thread test
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/subscribe', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_to_subscribe': (test_thread_name + "X"), 'user_to_subscribe': test_user_name
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'query error'
        assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
        
    # invalid user test
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/subscribe', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_to_subscribe': (test_thread_name), 'user_to_subscribe': (test_user_name + "X")
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'query error'
        assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
   
    # thread moderator test
    delete_thread(-10)
    db.session.add(Thread(thread_id=test_thread_id, thread_name=test_thread_name, thread_moderator="X"))
    db.session.commit()
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/subscribe', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_to_subscribe': test_thread_name, 'user_to_subscribe': test_user_name
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'permission denied'
        assert Subscription.query.filter_by(user_id=-10, thread_id=-10).first() == None
        
    delete_thread(-10)
    delete_user(-10)
    
def test_subscription_query(client):
    mock_user(-10, test_user_name, test_user_password)
    mock_thread(-10, test_thread_name)
    mock_subscription(-10, -10, -10)
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/getSubscriptions', json={
            'user_name': test_user_name, 'user_password': test_user_password
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert len(rv.get_json()['threads']) == 1
    
    delete_subscription(-10)
    delete_user(-10)

    with main.app.test_client() as c:
        rv = c.post('/api/v1/threads/getSubscriptions', json={
            'user_name': test_user_name, 'user_password': test_user_password
        })
        assert rv.status_code == 302
    
    delete_thread(-10)
    
def test_submit_message(client):
    mock_user(-10, test_user_name, test_user_password)
    mock_thread(-10, test_thread_name)
    mock_subscription(-10, -10, -10)
    
    assert Message.query.filter_by(user_id=-10).first() == None
    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/messages/submit', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': test_thread_name, 'text': 'test message'
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert Message.query.filter_by(user_id=-10).first() != None
        
    delete_message(Message.query.filter_by(user_id=-10).first().message_id)
    
    # invalid username test
    with main.app.test_client() as c:
        rv = c.post('/api/v1/messages/submit', json={
            'user_name': (test_user_name + "X"), 'user_password': test_user_password, 'thread_name': test_thread_name, 'text': 'test message'
        })
        assert rv.status_code == 302
        assert Message.query.filter_by(user_id=-10).first() == None
        
    # invalid thread name test    
    with main.app.test_client() as c:
        rv = c.post('/api/v1/messages/submit', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': (test_thread_name + "X"), 'text': 'test message'
        })
        assert rv.status_code == 302
        assert Message.query.filter_by(user_id=-10).first() == None
        
    # invalid subscription test
    delete_subscription(-10)
    with main.app.test_client() as c:
        rv = c.post('/api/v1/messages/submit', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': test_thread_name, 'text': 'test message'
        })
        assert rv.status_code == 302
        assert Message.query.filter_by(user_id=-10).first() == None
        
    delete_user(-10)
    delete_thread(-10)
    
def test_message_query(client):
    mock_user(-10, test_user_name, test_user_password)
    mock_thread(-10, test_thread_name)
    mock_subscription(-10, -10, -10)
    mock_message(-10, -10, -10, "test message")
                   
    with main.app.test_client() as c:
        rv = c.post('/api/v1/messages/query', json={
            'user_name': test_user_name, 'user_password': test_user_password, 'thread_name': test_thread_name
        })
        json_data = rv.get_json()
        assert rv.get_json()['response'] == 'success'
        assert rv.get_json()['thread_name'] == test_thread_name
        assert rv.get_json()['subscribed_users'] == [test_user_name]
        assert rv.get_json()['threads'] == [test_thread_name]
        assert len(rv.get_json()['messages']) > 0
    
    delete_subscription(-10)
    delete_message(-10)
    delete_user(-10)
    delete_thread(-10)
    
    


