import "./reactive-canvas-one.scss";
import { useEffect, useState } from "react";
import * as THREE from "three";
import SceneInit from "../../utils/InitScene";
import { vertexShader, fragmentShader } from "../../utils/Shaders";
import { GUI } from "dat.gui";

//*Component Imports
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { AudioUploader } from "../AudioUploader/AudioUploader";
import { AudioMicrophone } from "../AudioMicrophone/AudioMicrophone";
import { Instructions } from "../Instructions/Instructions";

let test, audioContext, audioElement, dataArray, analyser, source, gui;

export default function ReactiveCanvasOne({url}) {
  //*state
  const [componentState, setComponentState] = useState("player");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShape, setCurrentShape] = useState("sphere"); // Default to "sphere"
  const [isAudioContextReady, setIsAudioContextReady] = useState(false);

  const togglePlay = () => {
    setIsPlaying(prevValue => !prevValue);
  };

  const clearGui = () => {
    let myGuiContainer = document.getElementById("myGui");
    if (myGuiContainer) {
      myGuiContainer.innerHTML = "";
    }
  };

  const selectShape = (shape) => {
    setCurrentShape(shape);
  };

  const renderSwitch = (componentState) => {
    switch (componentState) {
      case "player":
        return (
          <AudioPlayer
            url={url}
            togglePlay={togglePlay}
            setComponentState={setComponentState}
          />
        );
      case "upload":
        return <AudioUploader setComponentState={setComponentState} />;
      case "microphone":
        return <AudioMicrophone setComponentState={setComponentState} />;
      default:
        return (
          <AudioPlayer
            togglePlay={togglePlay}
            setComponentState={setComponentState}
          />
        );
    }
  };

  const initGui = () => {
    gui = new GUI({ autoPlace: false });
    gui.domElement.id = "gui";
    let myGuiContainer = document.getElementById("myGui");
    if (myGuiContainer) {
      myGuiContainer.appendChild(gui.domElement);
    }
  };

  const setupAudioContext = () => {
    if (audioContext) return; // Prevent reinitialization

    audioElement = document.getElementById("myAudio");
    if (!audioElement) return; // Ensure audio element exists

    audioContext = new window.AudioContext();
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 1024;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  };

  const resumeAudioContext = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        setIsAudioContextReady(true);
      });
    } else {
      setIsAudioContextReady(true);
    }
  };

  const handleAudioContextStart = () => {
    setupAudioContext();
    resumeAudioContext();
  };

  const render = (uniforms) => {
    analyser.getByteFrequencyData(dataArray);
    uniforms.u_data_arr.value = dataArray;
    requestAnimationFrame(() => render(uniforms));
  };

  const play = () => {
    if (audioContext === undefined) {
      setupAudioContext();
    }

    if (audioContext && !isAudioContextReady) {
      resumeAudioContext();
    }

    const uniforms = {
      u_amplitude: { type: "f", value: 80.0 },
      u_data_arr: { type: "float[64]", value: dataArray },
      u_color_r: { type: "f", value: 38.0 },
      u_color_g: { type: "f", value: 0.0 },
      u_color_b: { type: "f", value: 32.0 },
    };

    const choseShape = (currentShape) => {
      switch (currentShape) {
        case "sphere":
          return new THREE.SphereGeometry(64, 64, 64);
        case "plane":
          return new THREE.PlaneGeometry(64, 64, 64, 64);
        case "torus":
          return new THREE.TorusGeometry(64, 20, 10, 100);
        default:
          return new THREE.SphereGeometry(64, 64, 64); // Default to sphere
      }
    };

    // Always return the sphere geometry since currentShape is always "sphere"
    const sphereGeometry = choseShape(currentShape);

    const sphereCustomMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      wireframe: true,
    });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereCustomMaterial);
    sphereMesh.rotation.x = -Math.PI / 2 + Math.PI / 4;
    sphereMesh.scale.set(2, 2, 0.5);
    sphereMesh.position.y = 8;

    // Clear the previous mesh and add the new sphere mesh
    if (test.scene.children.length > 0) {
      test.scene.remove(test.scene.children[0]); // Remove the old shape
    }
    test.scene.add(sphereMesh);

    clearGui();
    initGui();
  
    const audioWaveGui = gui.addFolder("audio");
    audioWaveGui
      .add(uniforms.u_amplitude, "value", 1.0, 100.0)
      .name("amplitude")
      .listen();

    const shapeResponse = gui.addFolder("shape");
    shapeResponse
      .add(sphereCustomMaterial, "wireframe")
      .name("wireframe")
      .listen();

    const color = gui.addFolder("colour");
    color.add(uniforms.u_color_r, "value", 0.0, 250.0).name("R").listen();
    color.add(uniforms.u_color_g, "value", 0.0, 250.0).name("G").listen();
    color.add(uniforms.u_color_b, "value", 0.0, 250.0).name("B").listen();
  
    if (isPlaying) {
      render(uniforms);
    }
  };

  useEffect(() => {
    test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    if (currentShape && isAudioContextReady) {
      play();
    }
  }, [currentShape, isPlaying, isAudioContextReady]);

  return (
    <div className="main" >
      <button onClick={handleAudioContextStart}>Start Audio</button> {/* Button to start audio */}
      <div className="contains">
        
       <div className="reactive-canvas__container" id="canvas-container">
        <canvas id="myThreeJsCanvas"></canvas>
      </div>
      <div className="reactive-canvas__controls">
        
        {renderSwitch(componentState)}
        {audioContext === undefined && <Instructions instruction={"audio"} />}
        
      </div>
      </div>
    </div>
  );
}

