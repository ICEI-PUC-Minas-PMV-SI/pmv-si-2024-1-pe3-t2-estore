import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/register.css";
import RegisterImg from "../assets/register.svg";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const teste = "http://localhost:3000/registro";

  const [formData, setFormData] = useState({
    NOME: "",
    SOBRENOME: "",
    EMAIL: "",
    CPF: "",
    SENHA: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(teste, formData);
      if ((res.status = 200)) {
        setIsSuccess(true);
        setMessage("Cadastrado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if ((error.response.status = 409)) {
        setMessage("Email já cadastrado.");
      } else {
        console.log("Erro ao se cadastrar:", error);
      }
    }
  };

  return (
    <div className="container-register">
      <div className="container-register-form">
        <form className="form-register" onSubmit={handleSubmit}>
          {message && <p className={isSuccess ? "status-success" : "status-error"}>{message}</p>}
          <h1>Registre-se aqui!</h1>
          <div className="inputs-register">
            <div className="column">
              <div className="textfield-register">
                <label htmlFor="">Nome:</label>
                <input type="text" name="NOME" id="nome" placeholder="Seu nome" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="">Sobrenome:</label>
                <input type="text" name="SOBRENOME" id="sobrenome" placeholder="Seu sobrenome" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="">CPF:</label>
                <input type="text" name="CPF" id="cpf" placeholder="Seu CPF" onChange={handleChange} required />
              </div>
            </div>
            <div className="column">
              <div className="textfield-register">
                <label htmlFor="">Email:</label>
                <input type="text" name="EMAIL" id="email" placeholder="Seu e-mail" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="">Senha:</label>
                <input type="password" name="SENHA" id="senha" placeholder="Sua senha" onChange={handleChange} required />
              </div>
              <div className="textfield-register">
                <label htmlFor="">Confirme sua senha:</label>
                <input type="password" name="confSenha" id="confSenha" placeholder="Sua senha novamente" required />
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

export default Register;
