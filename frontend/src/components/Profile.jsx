import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    EMAIL: "",
    NOME: "",
    SOBRENOME: "",
    CPF: "",
    SENHA: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    }
  }, []);

  return (
    <div className="profile-container">
      <form id="form-profile">
        <label htmlFor="email-profile">E-mail: </label>
        <input type="email" name="EMAIL" value={userData.EMAIL} readOnly className="css-addr-block" />
        <label htmlFor="nome-profile">Nome: </label>
        <input type="text" name="NOME" value={userData.NOME} readOnly className="css-addr-block" />
        <label htmlFor="sobrenome-profile">Sobrenome: </label>
        <input type="text" name="SOBRENOME" id="sobrenome-profile" />
        <label htmlFor="cpf-profile">CPF: </label>
        <input type="text" name="CPF" value={userData.CPF} readOnly className="css-addr-block" />
        <div className="input-profile">
          <input type="submit" value="Alterar dados" />
        </div>
      </form>
      <form id="form-password-profile">
        <h1>Deseja trocar sua senha?</h1>
        <label htmlFor="senha-profile">Nova senha:</label>
        <input type="password" name="SENHA" id="senha-profile" required />
        <label htmlFor="senha2-profile">Confirme sua nova senha:</label>
        <input type="password" name="CONFIRMAR_SENHA" id="senha2-profile" required />
        <div className="input-profile-password">
          <input type="submit" value="Cadastrar nova senha" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
