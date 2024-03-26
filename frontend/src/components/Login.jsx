import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../css/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form className="formsLogin">
        <div className="formsLogin_campo">
          <label htmlFor="email-login">E-mail:</label>
          <div className="inputWithIcon">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" id="email-login" className="campoLogin-login" placeholder="Digite seu e-mail" />
          </div>
        </div>
        <div className="formsLogin_campo">
          <label htmlFor="senha-login">Senha:</label>
          <div className="inputWithIcon">
            <FontAwesomeIcon icon={faLock} />
            <input type="password" id="senha-login" className="campoLogin-login" placeholder="Digite sua senha" />
          </div>
        </div>
        <div className="formsLogin_campo">
          <input type="submit" value="Login" className="btnLogin-login" />
        </div>
        <p className="esqueceuSenha">
          Não possui conta? <Link to="/">Clique Aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
