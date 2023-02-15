import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="footer w-100 text-center p-3 pt-5">
      <div className='text-white'>
        {/* <FontAwesomeIcon icon={faGithub} className="mr-5"/> */}
        <span>
          By <a href='https://github.com/petya0927' className='text-warning'>petya0927</a>
        </span>
      </div>
      <p className='text-white'>
        {/* <FontAwesomeIcon icon={faCodeBranch} className="mr-5"/> */}
        <span>
          Version: 1.0.16
        </span>
      </p>
    </div>
  )
}

export default Footer