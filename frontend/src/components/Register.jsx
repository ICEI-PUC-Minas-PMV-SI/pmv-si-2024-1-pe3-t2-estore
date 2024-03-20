import React from "react";
import RegisterImg from "../assets/register.svg";
import "../css/register.css";

export const Register = () => {
  return (
    <div className="container-register">
      <div className="container-register-form">
        <form action="" className="form-register">
          <h1>Registre-se aqui!</h1>
          <div className="inputs-register">
            <div className="textfield-register">
              <label htmlFor="">Email:</label>
              <input type="text" name="email" id="email" placeholder="Seu e-mail" />
            </div>
            <div className="textfield-register">
              <label htmlFor="">Senha:</label>
              <input type="password" name="senha" id="senha" placeholder="Sua senha" />
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
