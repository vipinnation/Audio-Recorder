import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay ,faPause} from "@fortawesome/free-solid-svg-icons";

const AudioListComponent = ({ audioClip }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [blobURL, setblobURL] = useState("");

  const playRecording = (audio_data) => {
    setIsPlaying(true)
    const base64Sound = audio_data.recordDataBase64;
    const mimeType = audio_data.mimeType;
    const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();

    setTimeout(()=>{
      setIsPlaying(false)
    },audio_data.msDuration)
  };

  const deleteRecording = (audio_data) => {};
  return (
    <div>
      <li className="list-none shadow-xl px-4 py-2 rounded-lg bg-lime-50 my-2 flex items-center" key={audioClip._id}>
        {isPlaying ? (
          <FontAwesomeIcon
            icon={faPause} 
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            onClick={(e) => {
              playRecording(audioClip);
            }}
          />
        )}
        <h2 className="text-lg mx-4">{audioClip.name}</h2>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={(e) => {
            deleteRecording();
          }}
        />
      </li>
    </div>
  );
};

export default AudioListComponent;
