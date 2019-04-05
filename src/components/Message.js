import React from 'react';

const currentUser = ''

const Message = ({ user_name, message_text }) => (
  <p className={user_name == currentUser ? 'message-sent' : 'message-received'}>
    {user_name}: {message_text}
  </p>
)

export default Message