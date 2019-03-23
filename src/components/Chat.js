import React, { Component } from 'react';
import SubmitMessage from '../containers/SubmitMessage';
import UserList from './UserList';
import MessageList from '../containers/MessageList';

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

const Chat = () => (
    <div className="row">
        <div className="col-3">
            <UserList />
        </div>
        <div className="col-9">
            <div className="row">
                <div className="col jumbotron">
                    <MessageList />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <SubmitMessage />
                </div>
            </div>
        </div>
    </div>
)

export default Chat