import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserAstronaut, faUserDoctor, faUserNinja, faUserSecret, faUserTie, faPoo, faBaby, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../store/userNameSlice';
import { setAvatar } from '../store/avatarSlice';

const UsernameInput = ({showSubmitButton=false}) => {
  const avatar = useSelector(state => state.avatar);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

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
      <div className="input-group mb-3 m-auto" style={{width: "fit-content"}}>
        {showSubmitButton && <input type="text" className="input form-control bg-transparent" placeholder="Username"
          onChange={e => {
            setInput(e.target.value);
          }}
        />}
        {!showSubmitButton && <input type="text" className="input form-control bg-transparent" placeholder="Username"
          onChange={e => 
            dispatch(setUserName(e.target.value))
          }
        />}
        <button className='btn btn-outline-light dropdown-toggle' data-bs-toggle="dropdown" type='button'>
          <FontAwesomeIcon icon={avatars[avatar]} className="mr-5 fa-lg" />
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUser'))}><FontAwesomeIcon icon={faUser} className="mr-10"/>Default</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUserAstronaut'))}><FontAwesomeIcon icon={faUserAstronaut} className="mr-10"/>Astronaut</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUserDoctor'))}><FontAwesomeIcon icon={faUserDoctor} className="mr-10"/>Doctor</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUserNinja'))}><FontAwesomeIcon icon={faUserNinja} className="mr-10"/>Ninja</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUserSecret'))}><FontAwesomeIcon icon={faUserSecret} className="mr-10"/>Secret agent</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faUserTie'))}><FontAwesomeIcon icon={faUserTie} className="mr-10"/>Business man</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faPoo'))}><FontAwesomeIcon icon={faPoo} className="mr-10"/>Poo</span></li>
          <li><span className='dropdown-item' onClick={() => dispatch(setAvatar('faBaby'))}><FontAwesomeIcon icon={faBaby} className="mr-10"/>Baby</span></li>
        </ul>
      </div>
      {showSubmitButton && <button className='btn btn-light fw-semibold' onClick={() => {
          dispatch(setUserName(input));
          const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?userName=${input}&avatar=${avatar}`;
          window.history.pushState({path:newurl},'',newurl);
        }}>
        Next
        <FontAwesomeIcon icon={faArrowRightLong} className="ml-5"/>
      </button>}
    </div>
  )
}

export default UsernameInput;