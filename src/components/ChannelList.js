import React from 'react';

const ChannelList = ({ threads, setThread }) => (
    <div className="">
    {threads.map(thread =>
      <button type="button" onClick={() => setThread(thread)} className="m-1" key={thread}><strong>{thread}</strong></button>
    )}
  </div>
)

export default ChannelList