import React, { useState } from "react";
import "../AudioMicrophone/audio-microphone.scss";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import { BsUpload } from "react-icons/bs";
import { BsMicMuteFill } from "react-icons/bs";

export const AudioMicrophone = (props) => {
  const [micActive, setMicActive] = useState(false);
  const [audio, setAudio] = useState({ audio: true });

  const getMicInput = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log(stream);
      })
      .catch(function (err) {
        /* handle the error */
      });
  };

  return (
    <div className="audio-microphone">
      <div className="audio-microphone__options">
        <BsUpload
          onClick={() => props.setComponentState("upload")}
          className="audio-player__icon"
        />
        <BsFillFileEarmarkMusicFill
          onClick={() => props.setComponentState("player")}
          className="audio-player__icon"
        />
      </div>
      {micActive ? (
        <BsFillMicFill
          onClick={() => {
            setMicActive(false);
          }}
          size={70}
          className="audio-microphone__icon"
        />
      ) : (
        <BsMicMuteFill
          onClick={() => {
            getMicInput();
            setMicActive(true);
          }}
          size={70}
          className="audio-microphone__icon"
        />
      )}
    </div>
  );
};
