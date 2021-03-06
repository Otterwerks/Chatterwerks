import React from 'react';
import UserList from '../containers/UserListContainer';
import ChannelList from '../containers/ChannelListContainer';
import MessageList from '../containers/MessageListContainer';
import SubmitMessage from '../containers/SubmitMessageContainer';
import Axios from 'axios';


const Chat = ({ user, queryStatus, updateQueryStatus, updateMessages, updateSubscribedUsers, updateSubscriptions, threadName }) => (
    <div>
        <div className="hidden">
            {setTimeout(function () {
                if (queryStatus == 'COMPLETE') {
                    updateQueryStatus('REQUESTED')
                    Axios.post('api/v1/messages/query', {
                        user_name: user.userName,
                        user_password: user.userPassword,
                        thread_name: user.currentThread
                    }).then((res) => {
                        if (res.data.response == 'success') {
                            updateMessages(res.data.messages);
                            updateSubscribedUsers(res.data.subscribed_users);
                            updateSubscriptions(res.data.threads);
                            updateQueryStatus('COMPLETE');
                        }
                        console.log(res);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
                }
                }, 5000)
            }
        </div>
        <div className="row page-bg p-3">
            <div className="col-sm-3">
            <div className="m-1 panel-bg p-2">
                <h4 className="d-flex justify-content-center">Current Channel</h4>
                <h3 className="d-flex text-info justify-content-center">{threadName}</h3>
            </div>
            <div id="accordion" role="tablist">
                <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                        <h5 className="mb-0">
                            <a data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Channels
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div className="card-body">
                            <ChannelList />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" role="tab" id="headingTwo">
                        <h5 className="mb-0">
                            <a data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Subscribed Users
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="card-body">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-sm-9 border-secondary">
                <div className="row">
                    <div id="chatField" className="col jumbotron bg-white chat-window">
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
    </div>
)

export default Chat