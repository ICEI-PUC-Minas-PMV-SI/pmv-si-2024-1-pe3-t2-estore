import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  const url_login = "http://localhost:3000/login";
  const navigate = useNavigate();

  const retrievetoken = localStorage.getItem("token");

  const [loginData, setLoginData] = useState({
    EMAIL: "",
    SENHA: "",
  });

  const handleValidateLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url_login, loginData);
      if ((res.status = 200)) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log(retrievetoken);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="container-register">
      <div className="container-register-form">
        <form className="form-register" onSubmit={handleValidateLogin}>
          <h1>Registre-se aqui!</h1>
          <div className="inputs-register">
            <div className="column-login">
              <div className="textfield-register">
                <label htmlFor="">Email:</label>
                <input type="text" name="EMAIL" id="email" placeholder="Seu e-mail" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="">Senha:</label>
                <input type="password" name="SENHA" id="senha" placeholder="Sua senha" onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="submit-register">
            <input type="submit" value="Registrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
