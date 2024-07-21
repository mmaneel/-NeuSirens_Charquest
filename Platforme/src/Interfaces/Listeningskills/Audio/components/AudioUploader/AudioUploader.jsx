import React, { useState } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
import "../AudioUploader/audio-uploader.scss";
import axios from "axios";

export const AudioUploader = (props) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="audio-uploader">
      <div className="audio-uploader__options">
        <BsFillMicFill
          onClick={() => props.setComponentState("microphone")}
          className="audio-uploader__icon"
        />
        <BsFillFileEarmarkMusicFill
          onClick={() => props.setComponentState("player")}
          className="audio-uploader__icon"
        />
      </div>
      <div>
        <form
          onSubmit={onFileSubmit}
          className="audio-uploader__form"
          action=""
        >
          <div className="audio-uploader__form-input">
            <label htmlFor="customFile">{fileName}</label>
            <input type="file" id="customFile" onChange={onFileSelect} />
          </div>
          <input type="submit" value="Upload" className="" />
        </form>
      </div>
    </div>
  );
};
