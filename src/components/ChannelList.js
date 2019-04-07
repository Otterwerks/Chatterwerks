import React from 'react';

const ChannelList = ({ threads }) => (
    <div className="">
    {threads.map(thread =>
      <div className="m-1" key={thread}><strong>{thread}</strong></div>
    )}
  </div>
)

export default ChannelList