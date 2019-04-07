import React from 'react';

const ChannelList = ({ users }) => (
    <div className="">
    {users.map(user =>
      <div className="m-1" key={user}><strong>{user}</strong></div>
    )}
  </div>
)

export default ChannelList