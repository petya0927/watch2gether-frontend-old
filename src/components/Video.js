import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({link, socket}) => {
  const playVideo = () => {
    socket.emit('play-video', {});
  }

  const pauseVideo = () => {
    socket.emit('pause-video');
  }

  return (
    <div>
      <ReactPlayer url={link} onPlay={playVideo} onPause={pauseVideo}/>
    </div>
  )
}

export default Video