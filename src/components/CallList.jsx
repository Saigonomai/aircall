import React from 'react';

import Call from './Call.jsx';
import './CallList.module.css';

const CallList = (props) => {
  return (
    <ul className='call-list'>
      {props.calls.map((call) => (
        <Call
        key={call.id}
        call={call}
        />
      ))}
    </ul>
  );
};

export default CallList;