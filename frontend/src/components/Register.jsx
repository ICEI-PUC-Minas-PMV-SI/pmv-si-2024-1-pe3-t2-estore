import React from "react";
import { useState } from "react";
import RegisterImg from "../assets/register.svg";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
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
      console.log(formData);
      const res = await axios.post(teste, formData);
      if ((res.status = 200)) {
        console.log("foi");
      }
      navigate("/");
    } catch (error) {
      console.log("Erro ao se cadastrar:", error);
    }
  };

  return (
    <div className="container-register">
      <div className="container-register-form">
        <form className="form-register" onSubmit={handleSubmit}>
          <h1>Registre-se aqui!</h1>
          <div className="inputs-register">
            <div className="textfield-register">
              <label htmlFor="">Nome:</label>
              <input type="text" name="NOME" placeholder="Seu nome" onChange={handleChange} required />
            </div>
            <div className="textfield-register">
              <label htmlFor="">Sobrenome:</label>
              <input type="text" name="SOBRENOME" placeholder="Seu sobrenome" onChange={handleChange} required />
            </div>
            <div className="textfield-register">
              <label htmlFor="">CPF:</label>
              <input type="text" name="CPF" placeholder="Seu CPF" onChange={handleChange} required />
            </div>
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
            <div className="submit-register">
              <input type="submit" value="Registrar" />
            </div>
          </div>
        </form>
      </div>

      <aside className="aside-register">
        <img className="image-register" src={RegisterImg} alt="Erro 404" />
      </aside>
    </div>
  );
};

export default Register;
