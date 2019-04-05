import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => (
  <div>
    {messages.map(message =>
      <Message key={message.message_id}{...message} />
    )}
  </div>
)

export default MessageList;