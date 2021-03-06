import React from 'react';
import Message from '../containers/MessageContainer';

const MessageList = ({ messages }) => (
  <div className="">
    {messages.map(message =>
      <Message key={message.message_id}{...message} />
    )}
  </div>
)

export default MessageList;