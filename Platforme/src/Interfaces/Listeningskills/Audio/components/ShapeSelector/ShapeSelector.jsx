import "../ShapeSelector/shape-selector.scss";
import sphereImg from "../../assets/images/sphere.png";
import planeImg from "../../assets/images/plane.png";
import tarusImg from "../../assets/images/taurus.png";
import { useState } from "react";

import React from "react";

export const ShapeSelector = ({ currentShape, selectShape }) => {
  const [shapeSelected, setShapeSelected] = useState(currentShape);

  return (
    <div className="shape-selector">
      <div className="shape-selector__img-container">
        <img
          className={`shape-selector__img ${
            shapeSelected === "sphere" ? "--selected" : ""
          }`}
          onClick={() => {
            setShapeSelected("sphere");
            selectShape("sphere");
          }}
          src={sphereImg}
          alt="sphere wireframe Three.js element"
        />
      </div>

      

     
    </div>
  );
};
