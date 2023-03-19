import React, { useEffect, useState } from 'react';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/CopyLink.css';

const CopyLink = ({roomLink}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-light rounded p-3 mb-3">
      <h5 className='fw-semibold'>Link for this room: </h5>
      <p className='mb-2'>Copy and send it to others</p>
      <div className='d-flex align-items-center justify-content-between bg-secondary p-3 rounded copy-link-section'
        style={{"--bs-bg-opacity": .1}}>
        <p className='text-truncate pe-3'>{roomLink}</p>
        {copied ? <FontAwesomeIcon icon={faCheck} className='copied-icon fa-xl' /> : <FontAwesomeIcon icon={faCopy} className='copy-icon fa-xl'
        onClick={() => {
          navigator.clipboard.writeText(roomLink);
          setCopied(true); 
          setTimeout(() => setCopied(false), 5000)
        }}/>}
      </div>
    </div>
  )
}

export default CopyLink