import React from 'react';

let currentUser = '';

const Message = ({ author, text }) => (
  <p className={author == currentUser ? 'message-sent' : 'message-received'}>
    {author}: {text}
  </p>
)

export default Message