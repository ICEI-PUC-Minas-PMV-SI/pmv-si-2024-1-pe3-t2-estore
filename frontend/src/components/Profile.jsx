import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Inputs from "./fragments/Inputs";
import "../css/Profile.css";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    CODPES: "",
    NOME: "",
    SOBRENOME: "",
    CPF: "",
    TELEFONE: "",
    EMAIL: "",
  });

  const [userPassword, setUserPassword] = useState({
    CODPES: "",
    NOME: "",
    SOBRENOME: "",
    CPF: "",
    TELEFONE: "",
    EMAIL: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(`http://localhost:3000/pessoa/buscar?CODPES=${decodedToken.CODPES}`, config);
          const user = response.data;
          setUserData({
            CODPES: user.CODPES,
            NOME: user.NOME,
            SOBRENOME: user.SOBRENOME,
            CPF: user.CPF,
            TELEFONE: user.TELEFONE,
            EMAIL: user.USUARIO.EMAIL,
          });
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }
    };

    fetchData();
  }, []);

  const updateData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.post("http://localhost:3000/pessoa/atualizar", userData, config);
        console.log(res);
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  const updatePassword = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.post("http://localhost:3000/pessoa/atualizar", userData, config);
        console.log(res);
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSetPassword = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  return (
    <div className="profile-container">
      <form id="form-profile" onSubmit={updateData}>
        <Inputs label="E-mail:" type="email" name="EMAIL" value={userData.EMAIL} readOnly className="css-addr-block" />
        <Inputs label="Telefone:" type="text" name="TELEFONE" defaultValue={userData.TELEFONE} onChange={handleChange} className="css-addr" placeholder="(XX) 9 XXXX-XXXX" />
        <Inputs label="Nome:" type="text" name="NOME" defaultValue={userData.NOME} onChange={handleChange} className="css-addr" />
        <Inputs label="Sobrenome:" type="text" name="SOBRENOME" value={userData.SOBRENOME} onChange={handleChange} id="sobrenome-profile" className="css-addr" />
        <Inputs label="CPF:" type="text" name="CPF" defaultValue={userData.CPF} onChange={handleChange} className="css-addr" />
        <div className="input-profile">
          <input type="submit" value="Alterar dados" />
        </div>
      </form>
      <form id="form-password-profile" onSubmit={updatePassword}>
        <h1>Deseja trocar sua senha?</h1>
        <Inputs label="Nova senha:" type="password" name="SENHA" id="senha-profile" onChange={handleSetPassword} required />
        <Inputs label="Confirme sua nova senha::" type="password" name="CONFIRMAR_SENHA" id="senha2-profile" required />
        <div className="input-profile-password">
          <input type="submit" value="Cadastrar nova senha" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
