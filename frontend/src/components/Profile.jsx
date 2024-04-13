import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";

const Profile = () => {
  const infoUser = "http://localhost:3000/users";
  const [userData, setUserData] = useState({
    EMAIL: "",
    NOME: "",
    SOBRENOME: "",
    CPF: "",
    SENHA: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(infoUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const backendData = res.data;
        console.log(backendData);
        setUserData(backendData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const setInputs = () => {
    const emailInput = document.getElementById("email-profile");
    const nameInput = document.getElementById("nome-profile");
    const secondNameInput = document.getElementById("sobrenome-profile");
    const cpfInput = document.getElementById("cpf-profile");

    emailInput.value = userData.EMAIL;
    nameInput.value = userData.NOME;
    secondNameInput.value = userData.SOBRENOME;
    cpfInput.value = userData.CPF;
  };

  useEffect(() => {
    setInputs();
  }, [userData]);

  return (
    <div className="profile-container">
      <form id="form-profile">
        <label htmlFor="email-profile">E-mail: </label>
        <input type="email" name="email-profile" id="email-profile" />
        <label htmlFor="email-profile">Nome: </label>
        <input type="email" name="email-profile" id="nome-profile" />
        <label htmlFor="email-profile">Sobrenome: </label>
        <input type="email" name="email-profile" id="sobrenome-profile" />
        <label htmlFor="email-profile">CPF: </label>
        <input type="email" name="email-profile" id="cpf-profile" />
        <div className="input-profile">
          <input type="submit" id="submit-profile" value="Atualizar dados" />
        </div>
      </form>
      <form id="form-password-profile">
        <h1>Deseja trocar sua senha?</h1>
        <label htmlFor="email-profile">Nova senha:</label>
        <input type="password" name="email-profile" id="senha-profile" required />
        <label htmlFor="email-profile">Confirme sua nova senha:</label>
        <input type="password" name="email-profile" id="senha2-profile" required />
        <div className="input-profile-password">
          <input type="submit" value="Cadastrar nova senha" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
