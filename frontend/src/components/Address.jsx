import React, { useState, useEffect } from "react";
import "../css/Address.css";
import axios from "axios";

const Address = () => {
  const [cep, setCEP] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState({
    CEP: "",
    RUA: "",
    BAIRRO: "",
    CIDADE: "",
    COMPLEMENTO: "",
    NUMERO: "",
    DESCRICAO: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    }
    setCEP(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cep.length === 9) {
        catchCEP();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cep]);

  const catchCEP = async () => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`);
      const data = res.data;
      setAddress(data);
      setInfo({
        ...info,
        CEP: data.cep,
        RUA: data.logradouro,
        BAIRRO: data.bairro,
        CIDADE: data.localidade,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const othersInputs = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const req = await axios.post("URLPOST", info);
      console.log(req);
    } catch (error) {
      console.log(error);
    }
    console.log(info);
  };

  return (
    <div>
      <form id="form-address" onSubmit={handleSubmit}>
        <div className="input-column1">
          <label htmlFor="cep">CEP: </label>
          <input type="text" name="CEP" className="css-addr" onChange={handleChange} value={cep} maxLength={9} />
          <label htmlFor="rua">Rua: </label>
          <input type="text" name="RUA" className="css-addr-block" value={address.logradouro} readOnly />
          <label htmlFor="numero">Número: </label>
          <input type="number" name="NUMERO" onChange={othersInputs} className="css-addr" />
          <label htmlFor="complemento">Complemento: </label>
          <input type="text" name="COMPLEMENTO" onChange={othersInputs} className="css-addr" />
        </div>
        <div className="input-column2">
          <label htmlFor="bairro">Bairro: </label>
          <input type="text" name="BAIRRO" className="css-addr-block" value={address.bairro} readOnly />
          <label htmlFor="cidade">Cidade: </label>
          <input type="text" name="CIDADE" className="css-addr-block" value={address.localidade} readOnly />
          <label htmlFor="cidade">Descrição: </label>
          <input type="text" name="DESCRICAO" className="css-addr" onChange={othersInputs} />
          <input type="submit" id="submit-address" value="Atualizar dados" />
        </div>
      </form>
    </div>
  );
};

export default Address;
