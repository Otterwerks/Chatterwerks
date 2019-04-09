import React from 'react';
import Axios from 'axios';

const UserList = ({ users, user }) => (
    <div className="">
    {users.map(member =>
      <button type="button" className="m-1"
                    onClick={() => Axios.post('/api/v1/threads/new', {
                                              "user_name": user.userName,
                                              "user_password": user.userPassword,
                                              "thread_name": ("Private chat with " + member),
                                              "thread_description": "Generated from clicking a user's name",
                                              "initial_subscriptions": [member]})
                                        .then((res) => {
                                          if (res.data.response == 'success') {
                                            //
                                          }})
                            }
                    key={member}>
                    <strong>
                      {member}
                    </strong>
      </button>
      )}
    </div>
)

export default UserList