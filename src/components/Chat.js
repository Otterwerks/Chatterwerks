import React, { Component } from 'react';
import ChatInput from './ChatInput';
import UserList from './UserList';

const TEST_MESSAGES = [
{
    text: "test message 1 from author 1",
    author: "Author1",
    message_id: 91252350,
},
{
    text: "test message 1 from author 2",
    author: "Author2",
    message_id: 98347698,
},
{
    text: "test message 2 from author 1",
    author: "Author1",
    message_id: 99135350,
},
{
    text: "test message 2 from author 2",
    author: "Author2",
    message_id: 93752838,
}]

function Messages(messages) {
    let MessageList = messages.map((message) =>
        <li key={message.message_id}>
            <p>{message.author}: {message.text}</p>
        </li>
    );
    return (
    <ul>
        {MessageList}
    </ul>
    );
}

const Chat = () => (
    <div className="row">
        <div className="col-3">
            <UserList />
        </div>
        <div className="col-9">
            <div className="row">
                <div className="col jumbotron">
                    {Messages(TEST_MESSAGES)}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <ChatInput />
                </div>
            </div>
        </div>
    </div>
)

export default Chat