import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import UsernameInput from './UsernameInput';
import { useSelector } from 'react-redux';
import { setUserName } from '../store/userNameSlice';
import { setAvatar } from '../store/avatarSlice';
import Footer from './Footer';

const CreateRoom = () => {
  const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3030` : 'https://watch2gether-petya0927.vercel.app';

  const userName = useSelector(state => state.userName);
  const avatar = useSelector(state => state.avatar);

  const [link, setLink] = useState('');
  const [existingRoom, setExistingRoom] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  let navigate = useNavigate();

  const createRoom = async () => {
    try {
      setIsCreating(true);
      const response = await fetch(`${baseUrl}/create-room/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: link,
        }),
      });
      setIsCreating(false);
      if (response.status === 500) {
        alert('Could not create room or room already exists');
        return;
      }
      const data = await response.json();
      
      navigate(`/room/${data.roomId}?userName=${userName}&avatar=${avatar}`, { replace: true });
    } catch (error) {
      setIsCreating(false);
      alert('Could not create room');
      console.log(error);
    }
  }

  const joinRoom = async () => {
    try {
      setIsJoining(true);
      const roomId = existingRoom.split('/')[4].split('?')[0];
      const response = await fetch(`${baseUrl}/room/${roomId}`);
      setIsJoining(false);
  
      if (response.status === 404) {
        alert('Room does not exist');
        return;
      }
  
      navigate(`/room/${roomId}?userName=${userName}&avatar=${avatar}`, { replace: true });
    } catch (error) {
      setIsJoining(false);
      alert('Could not join room');
      console.log(error);
    }
  }

  return (
    <div className="pt-5 p-4 text-white text-center w-100">
      <h1 className="font-weight-bold mb-5">Welcome to Watch2gether!</h1>
      {/* <p className="mb-4 fs-5">
        Watch2gether is a web application that allows you to watch a video with your friends, 2gether.
        <br />
        You can create a room and share the link with your friends, or join an existing room by entering the link.
      </p> */}

      <div className="mb-4">
        <UsernameInput setUserName={setUserName} avatar={avatar} setAvatar={setAvatar} />
        <div className='row w-100 justify-content-start'>
          <div>
            <h4 className="mb-1">Create a room here:</h4>
            <p className='mb-2'>Paste the link of the video here you want to watch</p>
            <div className='row mb-4 justify-content-center'>
              <input type="text" className="mt-2 w-auto input form-control bg-transparent mr-15" placeholder="Youtube video link here" onChange={e => setLink(e.target.value)} />
              <button className="mt-2 w-auto btn btn-light fw-semibold rounded" onClick={createRoom} disabled={!(userName && link)}>
                {!isCreating && 
                  <span>
                    Create room
                    <FontAwesomeIcon icon={faPlus} className="ml-5" />
                  </span>
                }
                {isCreating &&
                  <span>
                    Creating room
                    <span className="spinner-border spinner-border-sm text-black ml-5" role="status"/>
                  </span>
                }
              </button>
            </div>
          </div>
          <div className="">
            <h4 className="mb-2">Or join an existing room:</h4>
            <div className="row mb-4 justify-content-center">
              <input type="text" className="mt-2 w-auto input form-control bg-transparent mr-15" placeholder="Link to an existing room" onChange={e => setExistingRoom(e.target.value)} />

              <button className="mt-2 w-auto btn btn-light fw-semibold rounded" onClick={joinRoom} disabled={!(userName && existingRoom)}>
                {!isJoining && 
                  <span>
                    Join room
                    <FontAwesomeIcon icon={faArrowRight} className="ml-5" />
                  </span>
                }
                {isJoining &&
                  <span>
                    Joining room
                    <span className="spinner-border spinner-border-sm text-black ml-5" role="status"/>
                  </span>
                }
              </button>

            </div>   
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateRoom