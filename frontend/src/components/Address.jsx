import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/Address.css";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Inputs from "./fragments/Inputs";
import axios from "axios";

const Address = () => {
  const [addressInfo, setAddressInfo] = useState({
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
  const [addresses, setAddresses] = useState([]);
  const [invalidCep, setInvalidCep] = useState(false);

  const [editedAddress, setEditedAddress] = useState(null);

  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    }
    setCEP(value);
  };

  const isValidCEP = (cep) => {
    return cep.length === 9;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValidCEP(cep)) {
        fetchCEP();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cep]);

  const fetchCEP = async () => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`);
      const data = res.data;

      setAddressInfo((prevInfo) => ({
        ...prevInfo,
        CEP: data.cep || "",
        RUA: data.logradouro || "",
        BAIRRO: data.bairro || "",
        CIDADE: data.localidade || "",
      }));

      setInvalidCep(!data.cep);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://localhost:3000/pessoa/buscar?CODPES=${decodedToken.CODPES}`, config);
        const user = response.data;

        setAddressInfo({
          CODPES: user.CODPES,
        });
        setAddresses(user.ENDERECOS);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        if (editedAddress) {
          delete addressInfo.CODPES;
          await axios.patch("http://localhost:3000/endereco/atualizar/", addressInfo, config);
          setAddressInfo((prevInfo) => ({
            ...prevInfo,
            CEP: "",
            RUA: "",
            BAIRRO: "",
            CIDADE: "",
            COMPLEMENTO: "",
            NUMERO: "",
            DESCRICAO: "",
          }));
          setCEP("");

          // Atualizar a lista de endereços com o endereço editado
          setAddresses((prevAddresses) => prevAddresses.map((address) => (address.CODEND === editedAddress.CODEND ? { ...address, ...addressInfo } : address)));
        } else {
          const res = await axios.post("http://localhost:3000/endereco/cadastrar", addressInfo, config);
          setAddresses([...addresses, addressInfo]);
          setAddressInfo((prevInfo) => ({
            ...prevInfo,
            CEP: "",
            RUA: "",
            BAIRRO: "",
            CIDADE: "",
            COMPLEMENTO: "",
            NUMERO: "",
            DESCRICAO: "",
          }));
          setCEP("");
        }
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  const handleDelete = async (codend) => {
    const newAddresses = addresses.filter((address) => address.CODEND !== codend);
    setAddresses(newAddresses);
    const token = localStorage.getItem("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`http://localhost:3000/endereco/deletar?CODEND=${codend}`, config);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (address) => {
    setEditedAddress(address);
    setAddressInfo((prevAddressInfo) => ({
      ...prevAddressInfo,
      CODPES: prevAddressInfo.CODPES,
      CODEND: address.CODEND,
      CEP: address.CEP,
      RUA: address.RUA,
      BAIRRO: address.BAIRRO,
      CIDADE: address.CIDADE,
      COMPLEMENTO: address.COMPLEMENTO,
      NUMERO: address.NUMERO,
      DESCRICAO: address.DESCRICAO,
    }));
    setCEP(address.CEP);
  };

  return (
    <div className="container-address-inputs">
      <form id="form-address" onSubmit={handleSubmit}>
        <div className="input-column1">
          <Inputs label="CEP" type="text" name="CEP" className="css-addr" onChange={handleChange} value={cep} maxLength={9} placeholder="Digite seu cep aqui :)" required />
          {invalidCep ? <p style={{ color: "red" }}>* CEP INVÁLIDO, PREENCHA NOVAMENTE</p> : null}
          <Inputs label="Rua:" type="text" name="RUA" className="css-addr-block" value={addressInfo.RUA} readOnly={true} required />
          <Inputs
            label="Número:"
            type="number"
            name="NUMERO"
            onChange={(e) => setAddressInfo({ ...addressInfo, NUMERO: e.target.value })}
            className="css-addr"
            value={addressInfo.NUMERO}
            required
          />
          <Inputs
            label="Complemento:"
            type="text"
            name="COMPLEMENTO"
            onChange={(e) => setAddressInfo({ ...addressInfo, COMPLEMENTO: e.target.value })}
            className="css-addr"
            value={addressInfo.COMPLEMENTO}
            placeholder="apto 201, bloco 06..."
          />
        </div>
        <div className="input-column2">
          <Inputs label="Bairro:" type="text" name="BAIRRO" className="css-addr-block" value={addressInfo.BAIRRO} readOnly={true} required />
          <Inputs label="Cidade:" type="text" name="CIDADE" className="css-addr-block" value={addressInfo.CIDADE} readOnly={true} required />
          <Inputs
            label="Descrição:"
            type="text"
            name="DESCRICAO"
            className="css-addr"
            onChange={(e) => setAddressInfo({ ...addressInfo, DESCRICAO: e.target.value })}
            value={addressInfo.DESCRICAO}
            placeholder="Casa, trabalho..."
            required
          />
          <input type="submit" id="submit-address" value="Atualizar dados" />
        </div>
      </form>
      {addresses.length > 0 && <h1>Endereços cadastrados:</h1>}
      {addresses.map((address, index) => (
        <>
          <div className="endereco-container" key={index}>
            <div className="endereco">
              <h1>
                {address.DESCRICAO} - {address.CEP}
              </h1>
              <div className="icon-container">
                <span onClick={() => handleEdit(address)} className="edit-icon">
                  <FaPencilAlt />
                </span>
                <span onClick={() => handleDelete(address.CODEND)} className="delete-icon">
                  <FaTrash />
                </span>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
export default Address;
