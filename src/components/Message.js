import React from 'react';

let currentUser = '';

const Message = ({ user_name, text }) => (
  <p className={user_name == currentUser ? 'message-sent' : 'message-received'}>
    {user_name}: {text}
  </p>
)

export default Message