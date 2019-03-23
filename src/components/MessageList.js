import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => (
  <div>
    {messages.map(message =>
      <Message key={message.id}{...message} />
    )}
  </div>
)

export default MessageList