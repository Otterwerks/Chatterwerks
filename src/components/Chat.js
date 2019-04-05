import React, { Component } from 'react';
import UserList from './UserList';
import MessageList from '../containers/MessageListContainer';
import SubmitMessage from '../containers/SubmitMessageContainer';
import Axios from 'axios';


const Chat = ({ user, updateMessages }) => (
    <div className="row">
        {setInterval(function () {
            Axios.post('api/v1/messages/query', {
                user_name: user.userName,
                user_password: user.userPassword,
                thread_id: user.currentThread
            }).then((res) => {
                if (res.data.response == 'success') {
                updateMessages(res.data.messages)
                }
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            })
            }, 5000)
        }
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