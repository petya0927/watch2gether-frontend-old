import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
// import Video from "./Video";
import { io } from "socket.io-client";
import ReactPlayer from "react-player";
import Users from "./Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import CopyLink from "./CopyLink";
import UsernameInput from "./UsernameInput";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Room = () => {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://watch2gether-petya0927.vercel.app/';
  const currentUrl = window.location.href;

  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const videoRef = useRef(null);
  
  const id = useParams().roomId;
  const userName = useSelector(state => state.userName) || searchParams.get("userName");
  let avatar = useSelector(state => state.avatar);

  const connectSocket = () => {
    const connection = io(baseUrl, {
      query: {
        roomId: id,
        'userName': userName,
        'avatar': avatar
      }
    });
    connection.on("connected", () => {
      setSocket(connection);
      setConnected(true);
    });
    connection.on("user-already-in-room", () => {
      setConnected(false);
    });
    connection.on("room-not-found", () => {
      setConnected(false);
    });
  }

  const emitPlay = () => {
      // console.log('emit playing');
      socket.emit('emit-play', room.id);
      // setIsPlaying(true);
      emitProgress();
  }
  const emitPause = () => {
      // console.log('emit pausing');
      socket.emit('emit-pause', room.id);
      // setIsPlaying(false);
      // emitProgress(played);
  }
  const emitProgress = () => {
    if (!isPlaying) {
      // console.log('emit progress');
      socket.emit('emit-progress', {
        roomId: room.id,
        played: played
      });
    }
  }
  const emitPlaybackRate = (rate) => {
    socket.emit('emit-playback-rate', {
      roomId: room.id,
      playbackRate: rate
    });
  }
  const emitDisconnect = () => {
    socket.emit('disconnect', room.id);
  }
  
  // get room data from server, runs once after render
  useEffect(() => {
    const getRoomData = async () => {
      const response = await fetch(`${baseUrl}/room/${id}`);

      if (response.status === 404) {
        alert("Room not found!");
        return;
      }

      const data = await response.json();

      setRoom(data.room);
      setPlayed(data.room.played);
      avatar = searchParams.get("avatar");
      if (userName !== null) {
        connectSocket();
      }
    }

    getRoomData();
  }, []);

  useEffect(() => {
    if (userName !== null) {
      connectSocket();
    }
  }, [userName, avatar]);

  // event handlers
  useEffect(() => {
    if (socket) {
      socket.on('set-play', () => {
        // console.log('set playing');
        setIsPlaying(true);
      });
  
      socket.on('set-pause', () => {
        // console.log('set paused');
        setIsPlaying(false);
      });

      socket.on('set-progress', (data) => {
        // console.log('set progress', data.played);
        if (videoRef.current) {
          videoRef.current.seekTo(data.played, 'seconds');
        }
        // setPlayed(data.played);
      });

      socket.on('set-playback-rate', (data) => {
        // console.log('set playback rate', data.playbackRate);
        setPlaybackRate(data.playbackRate);
      });

      socket.on('new-user-connected', (data) => {
        console.log('new user connected', data.user);
        setRoom({
          ...room,
          users: [...room.users, data.user]
        });
      });
    }
  }, [socket]);

  return (
    <div className="h-100 d-flex flex-column p-4">
      <Link to="/">
        <button className="btn btn-light fw-semibold">
          <FontAwesomeIcon icon={faArrowLeftLong} className="mr-5" />
          Back
        </button>
      </Link>
      { userName &&
        <div className={`row align-content-center justify-content-center align-items-center pt-5 ${window.innerWidth < 922 ? 'mw-100' : 'h-100'}`} >
          {room && socket &&
            <div className="col-12 col-lg-7 p-0 pe-lg-3 pb-3 pb-lg-0">
              <ReactPlayer
                id="player"
                className="w-100"
                style={{width: "100%", height: "430px", maxHeight: "60vw"}}
                ref={videoRef}
                url={room.link}
                onReady={() => {
                  videoRef.current.seekTo(room.played);
                }}
                onStart={emitPlay}
                onPlay={emitPlay}
                onPause={emitPause}
                playing={isPlaying}
                controls={true}
                onProgress={progress => {
                  setPlayed(progress.playedSeconds);
                }}
                playbackRate={playbackRate}
                onPlaybackRateChange={rate => {
                  emitPlaybackRate(rate);
                }}
              />
            </div>
          }
          { room && socket &&
            <div className="col-12 col-lg-5 p-0 ps-lg-3 pt-3 pt-lg-0">
              <CopyLink roomLink={`${window.location.origin}/room/${id}`}/>
              <Users users={room.users} ownUserName={userName}/>
            </div>
          }
          { room && !socket && 
            <div>
              <h3 className="text-center text-white mb-3">Your username is already in use, or room does not exist</h3>
            </div>
          }

        </div>
      }
      { !userName &&
        <div className="h-100 row align-content-center justify-content-center align-items-center text-center">
          <h1 className="font-weight-bold text-white mb-3">Welcome to Watch2gether!</h1>
          <h4 className="text-white mb-5">Please select your name and avatar</h4>
          <UsernameInput showSubmitButton/>
        </div>
      }
      <Footer />
    </div>
  );
}

export default Room;
