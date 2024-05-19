import React from "react";
import "../css/Aboutus.css";
import Us from "./fragments/Us";
import Gabrielpng from "../assets/Gabriel.png";
import Lucaspng from "../assets/Lucas.jpeg";
import Pedropng from "../assets/Pedro.png";
import Victorpng from "../assets/Victor.png";
const Aboutus = () => {
  return (
    <>
      <div className="titleus">
        <h1> Sobre nós </h1>
      </div>

      <div className="containerus">
        <Us personImage={Lucaspng} personText="Lucas"></Us>
        <Us personImage={Victorpng} personText="Victor"></Us>
        <Us personImage={Pedropng} personText="Pedro"></Us>
        <Us personImage={Gabrielpng} personText="Gabriel"></Us>
      </div>
    </>
  );
};

export default Aboutus;
