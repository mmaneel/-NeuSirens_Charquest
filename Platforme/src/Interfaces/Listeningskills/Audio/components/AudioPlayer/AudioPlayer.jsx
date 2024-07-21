import React from "react";
import "../AudioPlayer/audio-player.scss";
import { BsUpload } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { useEffect, useRef } from 'react';
import testMusic from "../../assets/Music/RickRoll.mp3";


const AudioPlayer = ({url, togglePlay, setComponentState }) => {
  const audioRef = useRef(null);
  useEffect(() => {
    if (url) {
      // Use a different CORS proxy to fetch the audio file
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      fetch(proxyUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const audioObjectUrl = URL.createObjectURL(blob);
          if (audioRef.current) {
            audioRef.current.src = audioObjectUrl;
            audioRef.current.play();
          }
        })
        .catch(error => console.error('Error fetching audio:', error));
    }
  }, [url]);
  return (

    <div className="audio-player" >
      <div className="audio-player__options">
        <BsUpload
          onClick={() => setComponentState("upload")}
          className="audio-player__icon"
        />
        <BsFillMicFill
          onClick={() => setComponentState("microphone")}
          className="audio-player__icon"
        />
      </div>
      <div className="audio-player__container">
        <audio
          id="myAudio"
          controls
          onPlay={togglePlay}
          onPause={togglePlay}
          ref={audioRef}
        ></audio>
      </div>
      <div>
        <button id="but">Next</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
