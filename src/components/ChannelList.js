import React from 'react';

const ChannelList = ({ threads, setThread }) => (
    <div className="">
    {threads.map(thread =>
      <button type="button" onClick={() => setThread(thread)} className="btn m1 btn-sm btn-block btn-secondary" key={thread}><strong>{thread}</strong></button>
    )}
  </div>
)

export default ChannelList