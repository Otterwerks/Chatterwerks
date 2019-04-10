import React from 'react';
import axios from 'axios';

const RegisterForm = ({ setSuccess, setErrorMessage }) => {
    let name;
    let pass1;
    let pass2;
  
    return (
      <div>
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
              <input className="form-control" type="password" ref={node => pass1 = node} />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Retype Password</span>
              </div>
              <input className="form-control" type="password" ref={node => pass2 = node} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary mb-2" type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default RegisterForm