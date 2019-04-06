import React from 'react';
import axios from 'axios';

const RegisterForm = ({ setSuccess, setErrorMessage }) => {
    let name;
    let pass1;
    let pass2;
  
    return (
      <div>
      <h2>DISCLAIMER: PLEASE USE A THROWAWAY PASSWORD</h2>
      <h3>I have done my best to secure the database of this project but the source code is publicly available so please do not use a real password that you commonly use for other accounts.</h3>
        <form onSubmit={e => {
          e.preventDefault()
          if (!name.value.trim() || !pass1.value.trim()) {
            return
          }
          if (pass1.value != pass2.value) {
            pass1.value = ''
            pass2.value = ''
            setErrorMessage("Password does not match, try again")
            return
          }
          axios.post('api/v1/users/register', {
            user_name: name.value,
            user_password: pass1.value,
          })
          .then((res) => {
            if (res.data.response == 'success') {
              setSuccess(true)
              return
            } else if (res.data.response == 'username_taken') {
                setErrorMessage("Username already taken, please choose a different name.")
            } else {
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
          <row><div className="col"><h3>Password: <input type="password" ref={node => pass1 = node} /></h3></div></row>
          <row><div className="col"><h3>Confirm Password: <input type="password" ref={node => pass2 = node} /></h3></div></row>
          <row><div className="col"><button type="submit">Register</button></div></row>
        </div>
        </form>
      </div>
    )
  }

export default RegisterForm