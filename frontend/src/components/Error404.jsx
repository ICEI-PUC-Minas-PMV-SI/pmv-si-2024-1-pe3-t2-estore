import React from "react";
import ErroSVG from "../assets/404.svg";
import "../css/Error404.css";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="img_container">
      <img className="img" src={ErroSVG} alt="Erro 404" />
      <p className="p">
        Você achou uma página que não existe. <br /> Deseja voltar para a <Link to="/">tela principal</Link>?
      </p>
    </div>
  );
};

export default Error404;
