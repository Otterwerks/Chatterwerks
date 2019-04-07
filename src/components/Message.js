import React from 'react';

const Message = ({ user_name, message_text, userName }) => (
  <div className={'message ' + (user_name == userName ? 'message-sent' : 'message-received')}>
    <p className={'d-inline-flex p-2 m-2 blockquote ' + (user_name == userName ? 'color-1' : 'color-2')}><strong>{user_name}:&nbsp;</strong>{message_text}</p>
  </div>
)

export default Message