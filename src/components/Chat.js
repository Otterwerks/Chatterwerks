import React, { Component } from 'react';
import UserList from './UserList';
import MessageList from '../containers/MessageListContainer';
import SubmitMessage from '../containers/SubmitMessageContainer';

const Chat = () => (
    <div className="row">
        <div className="col-3">
            <UserList />
        </div>
        <div className="col-9">
            <div className="row">
                <div id="chatField" className="col jumbotron chat-window">
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