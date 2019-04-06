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
          <input ref={node => name = node} />
          <input ref={node => pass = node} />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

export default LoginForm