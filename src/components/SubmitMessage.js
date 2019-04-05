
import React from 'react';
import axios from 'axios';

const SubmitMessage = ({ user, updateSubmissionStatus}) => {
  let input;

  return (
    <div>
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
          message_text: input
        })
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        })
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default SubmitMessage