import React from "react";
import Gabrielpng from "../assets/Gabriel.png"
import Lucaspng from "../assets/Lucas.jpeg"
import Pedropng from "../assets/Pedro.png"
import Victorpng from "../assets/Victor.png"
const Aboutus = () => {
  return (
    <>
      <div className="titleus">
        <h1>  Sobre nós  </h1>
      </div>

      <div className="containerus">

        <div className="container-person">
          <div className="containerimage">
            <img className="personimg" src={Lucaspng} alt="" />
          </div>
          <div className="containertext">
            <h1> blablabla  </h1>
          </div>
        </div>

        <div className="container-person">
          
          <div className="containertext">
            <h1> blablabla  </h1>
          </div>
          <div className="containerimage">
            <img className="personimg" src={Pedropng} alt="" />
          </div>
        </div>



        <div className="container-person">
          <div className="containerimage">
            <img className="personimg" src={Victorpng} alt="" />
          </div>
          <div className="containertext">
            <h1> blablabla  </h1>
          </div>
        </div>


        <div className="container-person">
          
          <div className="containertext">
            <h1> blablabla  </h1>
          </div>
          <div className="containerimage">
            <img className="personimg" src={Gabrielpng} alt="" />
          </div>
        </div>


      </div>

    </>

  )
};


export default Aboutus;
