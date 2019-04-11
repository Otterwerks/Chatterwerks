import main
import pytest
import time
from main import db

test_user_id = -10
test_user_name = "" #time.time() / 10
test_user_password = "" #testpassword

test_thread_id = -10
test_thread_name = "" # time.time() / 10

test_subscription_id = -10


@pytest.fixture
def client():
    client = main.app.test_client()
    yield client
    
def test_db_read_write(client):
    assert true

def test_resolve_user(client):
    assert Get_User_ID(test_user_id, test_user_password) == -10
    assert Get_User_ID(test_user_id + "x", test_user_password) == "id_not_found"  
    assert Get_User_ID() == "id_not_found"

def test_resolve_thread(client):
    assert Get_Thread_ID(test_thread_name) == -10
    assert Get_Thread_ID(test_thread_name + "x") == "id_not_found"
    assert Get_Thread_ID() == "id_not_found"

def test_resolve_subscription(client):
    assert Get_Subscription_ID(test_user_id, test_thread_id) == -10
    assert Get_Subscription_ID(test_user_id + "x", test_thread_id) == "id_not_found"
    assert Get_Subscription_ID() == "id_not_found"
    
def test_create_subscription(client):
    assert Subscription.query.filter_by(user_id=-11, thread_id=-11).first() == None
    Create_Subscription(-11, -11)
    assert Subscription.query.filter_by(user_id=-11, thread_id=-11).first() not None
    
with app.test_client() as c:
    rv = c.post('/api/v1/users/login', json={
        'user_name': test_user_name, 'user_password': test_user_password
    })
    json_data = rv.get_json()
    assert rv.get_json()['response'] == 'success'
    
with app.test_client() as c:
    rv = c.post('/api/v1/users/login', json={
        'user_name': test_user_name, 'user_password': (test_user_password + "x")
    })
    json_data = rv.get_json()
    assert rv.get_json()['response'] == 'incorrect'

with app.test_client() as c:
    rv = c.post('/api/v1/users/login', json={
        'user_name': (test_user_name + "x"), 'user_password': (test_user_password + "x")
    })
    json_data = rv.get_json()
    assert rv.get_json()['response'] == 'failed'
    
