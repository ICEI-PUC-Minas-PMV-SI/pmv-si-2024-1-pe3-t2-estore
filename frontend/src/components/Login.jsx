import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  const url_login = "http://localhost:3000/login";
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const retrievetoken = localStorage.getItem("token");
  useEffect(() => {
    const retrievetoken = localStorage.getItem("token");
    if (retrievetoken) {
      try {
        const decodedToken = JSON.parse(atob(retrievetoken.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000; // Convertendo segundos para milissegundos
        if (Date.now() < expirationTime) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [retrievetoken, navigate]);

  const [loginData, setLoginData] = useState({
    EMAIL: "",
    SENHA: "",
  });

  const handleValidateLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url_login, loginData);
      if (res.status === 201 || res.status === 204 || res.status === 200) {
        setIsSuccess(true);
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log(token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage("Usuário ou senha incorretos.");
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="container-register">
      <div className="container-register-form">
        <form className="form-register-login" onSubmit={handleValidateLogin}>
          {message && <p className={isSuccess ? "status-success" : "status-error"}>{message}</p>}
          <h1>Faça login aqui!</h1>
          <div className="inputs-register">
            <div className="column-login">
              <div className="textfield-register">
                <label htmlFor="email">Email:</label>
                <input type="text" name="EMAIL" id="email" placeholder="Seu e-mail" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="SENHA" id="senha" placeholder="Sua senha" onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="submit-login">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
