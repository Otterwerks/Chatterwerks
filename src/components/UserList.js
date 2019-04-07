import React from 'react';

const UserList = ({ users }) => (
    <div className="">
    {users.map(user =>
      <div className="m-1" key={user}><strong>{user}</strong></div>
    )}
  </div>
)

export default UserList