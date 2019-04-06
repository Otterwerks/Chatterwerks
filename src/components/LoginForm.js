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
            } else if (res.data.response == 'incorrect') {
                pass.value = ''
            } else {
                pass.value = ''
            }
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          })
        }}>
        <div>
          <row><div className="col"><h3>Username: <input ref={node => name = node} /></h3></div></row>
          <row><div className="col"><h3>Password: <input type="password" ref={node => pass = node} /></h3></div></row>
          <row><div className="col"><button type="submit">Login</button></div></row>
        </div>
        </form>
      </div>
    )
  }

export default LoginForm