
import React from 'react';
import axios from 'axios';

const SubmitMessage = ({ user, updateSubmissionStatus}) => {
  let input;

  return (
    <div className="w-100">
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        updateSubmissionStatus('SUBMITTED');
        axios.post('api/v1/messages/submit', {
          user_name: user.userName,
          user_password: user.userPassword,
          thread_id: user.currentThread,
          text: input.value
        })
        .then((res) => {
          if (res.data.response == 'success') {
            updateSubmissionStatus('DONE')
          } else {
            updateSubmissionStatus('FAILED')
          }
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        })
        input.value = '';
      }}>
      <div className="input-group">
        <input className="w-75 text-success" ref={node => input = node} />
        <div className="input-group-append w-25">
          <button className="btn btn-secondary w-100" type="submit">Send</button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default SubmitMessage