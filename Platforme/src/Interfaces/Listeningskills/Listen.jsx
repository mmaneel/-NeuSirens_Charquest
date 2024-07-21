import React, { useState } from 'react';
import './Listen.css';
import Header from '../../Components/Header/Header';
import MainUI from "./Audio/components/MainUI/MainUI";
import { useEffect } from 'react';
import axios from 'axios';

function Listen() {
  const [data, setData] = useState(null);
  const [url, seturl] = useState("null");
  const postData = async () => {
    try {
      const response = await axios.post('https://cb62-34-74-201-11.ngrok-free.app/generateAudio', {
        type: 'Emotions',
      });
      console.log(response.data); // Print the response to the console
      setData(response.data); // Store the response data in state
      seturl(response.data.audio_url)
    } catch (error) {
      console.error('Error posting data:', error);
      
    }
  };

  useEffect(() => {
    postData(); // Call the POST request when the component mounts
  }, []);
  return (
    <div className="Listen">
     <Header/>
     <MainUI url={url} Data={data}/>

    </div>
  );
}

export default Listen;
