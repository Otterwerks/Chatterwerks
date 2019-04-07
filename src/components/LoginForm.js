import React from 'react';
import axios from 'axios';

const LoginForm = ({ updateUser, setRedirect }) => {
    let name;
    let pass;
  
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!name.value.trim() || !pass.value.trim()) {
            return
          }
          axios.post('api/v1/users/login', {
            user_name: name.value,
            user_password: pass.value,
          })
          .then((res) => {
            if (res.data.response == 'success') {
              updateUser({
                  userName: name.value,
                  userPassword: pass.value,
                  isLoggedIn: true,
                  currentThread: 1
              })
              setRedirect(true)
              return
            }
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          })
        }}>
          <div className="">
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Username</span>
              </div>
              <input className="form-control" ref={node => name = node} />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Password</span>
              </div>
              <input className="form-control" type="password" ref={node => pass = node} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary mb-2" type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default LoginForm