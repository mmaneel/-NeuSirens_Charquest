import React, { useState } from "react";
import "./main-ui.scss";
import ReactiveCanvasOne from "../ReactiveCanvasOne/ReactiveCanvasOne";
import QuizSection from "./Quiz"; // Import your QuizSection component

export default function MainUI({ url,Data }) {
  const [showCanvas, setShowCanvas] = useState(true); // State to manage visibility of ReactiveCanvasOne

  const handleNextClick = () => {
    setShowCanvas(false); // Hide ReactiveCanvasOne when button is clicked
  };

  return (
    <div className="main-ui">
      {showCanvas ? (
        <ReactiveCanvasOne url={url} />
      ) : (
        <QuizSection data={Data}/> // Show QuizSection when ReactiveCanvasOne is hidden
      )}
      <div className="subdiv">
        <button id="but" onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}
