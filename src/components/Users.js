import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserAstronaut, faUserDoctor, faUserNinja, faUserSecret, faUserTie, faPoo, faBaby } from '@fortawesome/free-solid-svg-icons';

const Users = ({users, ownUserName}) => {
  const avatars = {
    'faUser': faUser,
    'faUserAstronaut': faUserAstronaut,
    'faUserDoctor': faUserDoctor,
    'faUserTie': faUserTie,
    'faUserSecret': faUserSecret,
    'faUserNinja': faUserNinja,
    'faPoo': faPoo,
    'faBaby': faBaby,
  }

  return (
    <div>
      { users && 
        <div className="bg-light rounded p-3">
          <h5 className='mb-3 fw-semibold'>Users:</h5>
          {users.map(user => user.userName !== ownUserName ?
            <div className='mt-2' key={user.id}>
              <FontAwesomeIcon icon={avatars[user.avatar]} className="mr-10"/>
              <span className="fw-semibold">{user.userName}</span>
            </div>
            : null
          )}
          {users.length === 0 ? <p>No users connected</p> : <div></div>}
        </div> }
    </div>
  )
}

export default Users