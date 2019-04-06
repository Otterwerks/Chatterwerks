import React from 'react';
import axios from 'axios';

const RegisterForm = ({ setSuccess, setErrorMessage }) => {
    let name;
    let pass;
  
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!name.value.trim() || !pass.value.trim()) {
            return
          }
          axios.post('api/v1/users/register', {
            user_name: name.value,
            user_password: pass.value,
          })
          .then((res) => {
            if (res.data.response == 'success') {
              setSuccess(true)
              return
            } else if (res.data.response == 'username_taken') {
                pass.value = ''
                setErrorMessage("Username already taken, please choose a different name.")
            } else {
                pass.value = ''
                setErrorMessage("Server error, please try again. Please contact system administrator if this problem persists.")
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
          <row><div className="col"><button type="submit">Register</button></div></row>
        </div>
        </form>
      </div>
    )
  }

export default RegisterForm