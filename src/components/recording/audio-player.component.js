import React, { useEffect, useRef } from 'react'

const AudioPlayer = ({url}) => {
  const audioPlayer = useRef(); 
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (url) {
      setPlaying(true);
      audioPlayer.current.play();
    }
  };

  const stop = () => {
    if (url) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
    }
  };

  const onPlaying= () => {
    if (audioPlayer.current.paused) setPlaying(false);
  }
  
  return (
    <div onClick={(!playing ? play : stop)}>
      <audio
       src={url}
       ref={audioPlayer}         
       onTimeUpdate={onPlaying}
      >
       Your browser does not support the
       <code>audio</code> element.
      </audio>
    </div>
  )
}

export default AudioPlayer
