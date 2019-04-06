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
          <input ref={node => name = node} />
          <input ref={node => pass = node} />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

export default RegisterForm