import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/Address.css";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Inputs from "./fragments/Inputs";
import axios from "axios";

const Address = () => {
  const [info, setInfo] = useState({
    CODPES: "",
    CODEND: "",
    CEP: "",
    RUA: "",
    BAIRRO: "",
    CIDADE: "",
    COMPLEMENTO: "",
    NUMERO: "",
    DESCRICAO: "",
  });
  const [cep, setCEP] = useState("");
  const [cepInvalido, setCepInvalido] = useState(false);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoEditado, setEnderecoEditado] = useState(null);

  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    }
    setCEP(value);
  };

  const validarCEP = (cep) => {
    return cep.length === 9;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validarCEP(cep)) {
        catchCEP();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cep]);

  const catchCEP = async () => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`);
      const data = res.data;

      setInfo((prevInfo) => ({
        ...prevInfo,
        CEP: data.cep || "",
        RUA: data.logradouro || "",
        BAIRRO: data.bairro || "",
        CIDADE: data.localidade || "",
      }));

      setCepInvalido(!data.cep);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get(`http://localhost:3000/pessoa/buscar?CODPES=${decodedToken.CODPES}`, config);
        const user = response.data;

        setInfo({
          CODPES: user.CODPES,
        });
        setEnderecos(user.ENDERECOS);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        if (enderecoEditado) {
          delete info.CODPES;
          const res = await axios.patch("http://localhost:3000/endereco/atualizar/", info, config);
        } else {
          const res = await axios.post("http://localhost:3000/endereco/cadastrar", info, config);
          setEnderecos([...enderecos, info]);
          console.log(res);
        }
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  const handleDelete = (index) => {
    const newEnderecos = [...enderecos];
    newEnderecos.splice(index, 1);
    setEnderecos(newEnderecos);
  };

  const handleEdit = (endereco) => {
    setEnderecoEditado(endereco);
    setInfo({
      CODPES: info.CODPES,
      CODEND: endereco.CODEND,
      CEP: endereco.CEP,
      RUA: endereco.RUA,
      BAIRRO: endereco.BAIRRO,
      CIDADE: endereco.CIDADE,
      COMPLEMENTO: endereco.COMPLEMENTO,
      NUMERO: endereco.NUMERO,
      DESCRICAO: endereco.DESCRICAO,
    });
    setCEP(endereco.CEP);
  };

  return (
    <div>
      <form id="form-address" onSubmit={handleSubmit}>
        <div className="input-column1">
          <Inputs label="CEP" type="text" name="CEP" className="css-addr" onChange={handleChange} value={cep} maxLength={9} placeholder="Digite seu cep aqui :)" required />
          {cepInvalido ? <p style={{ color: "red" }}>* CEP INVÁLIDO, PREENCHA NOVAMENTE</p> : null}
          <Inputs label="Rua:" type="text" name="RUA" className="css-addr-block" value={info.RUA} readOnly={true} required />
          <Inputs label="Número:" type="number" name="NUMERO" onChange={(e) => setInfo({ ...info, NUMERO: e.target.value })} className="css-addr" value={info.NUMERO} required />
          <Inputs
            label="Complemento:"
            type="text"
            name="COMPLEMENTO"
            onChange={(e) => setInfo({ ...info, COMPLEMENTO: e.target.value })}
            className="css-addr"
            value={info.COMPLEMENTO}
            placeholder="apto 201, bloco 06..."
          />
        </div>
        <div className="input-column2">
          <Inputs label="Bairro:" type="text" name="BAIRRO" className="css-addr-block" value={info.BAIRRO} readOnly={true} required />
          <Inputs label="Cidade:" type="text" name="CIDADE" className="css-addr-block" value={info.CIDADE} readOnly={true} required />
          <Inputs
            label="Descrição:"
            type="text"
            name="DESCRICAO"
            className="css-addr"
            onChange={(e) => setInfo({ ...info, DESCRICAO: e.target.value })}
            value={info.DESCRICAO}
            placeholder="Casa, trabalho..."
            required
          />
          <input type="submit" id="submit-address" value="Atualizar dados" />
        </div>
      </form>
      <h1>Endereços cadastrados:</h1>
      {enderecos.map((endereco, index) => (
        <div className="endereco-container" key={index}>
          <div className="endereco">
            <h1>
              {endereco.DESCRICAO} - {endereco.CEP}
            </h1>

            <div className="icon-container">
              <span onClick={() => handleEdit(endereco)} className="edit-icon">
                <FaPencilAlt />
              </span>
              <span onClick={() => handleDelete(index)} className="delete-icon">
                <FaTrash />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Address;
