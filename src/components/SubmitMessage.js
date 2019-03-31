
import React from 'react';
import axios from 'axios';

const SubmitMessage = () => {
  let input;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        axios.post('api/v1/messages/submit', {
          user_name: this.props.store.getState().user_name,
          user_password: this.props.store.getState().user_password,
          thread_id: this.props.store.getState().current_thread,
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