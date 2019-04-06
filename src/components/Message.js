import React from 'react';

const Message = ({ user_name, message_text, userName }) => (
  <p className={user_name == userName ? 'message-sent' : 'message-received'}>
    {user_name}: {message_text}
  </p>
)

export default Message