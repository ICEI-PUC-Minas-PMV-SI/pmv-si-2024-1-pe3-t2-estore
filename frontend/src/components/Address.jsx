import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/Address.css";
import axios from "axios";

const Address = () => {
  const [cep, setCEP] = useState("");
  const [info, setInfo] = useState({
    CODPES: "",
    CEP: "",
    RUA: "",
    BAIRRO: "",
    CIDADE: "",
    COMPLEMENTO: "",
    NUMERO: "",
    DESCRICAO: "",
  });
  const [cepInvalido, setCepInvalido] = useState(false);

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

      setInfo({
        ...info,
        CEP: data.cep || "",
        RUA: data.logradouro || "",
        BAIRRO: data.bairro || "",
        CIDADE: data.localidade || "",
      });

      if (!data.cep) {
        setCepInvalido(true);
      } else {
        setCepInvalido(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          const enderecoPrincipal = user.ENDERECOS[0];

          setInfo({
            CODPES: user.CODPES || "",
            CEP: enderecoPrincipal ? enderecoPrincipal.CEP : "",
            RUA: enderecoPrincipal ? enderecoPrincipal.RUA : "",
            BAIRRO: enderecoPrincipal ? enderecoPrincipal.BAIRRO : "",
            CIDADE: enderecoPrincipal ? enderecoPrincipal.CIDADE : "",
            COMPLEMENTO: enderecoPrincipal ? enderecoPrincipal.COMPLEMENTO : "",
            NUMERO: enderecoPrincipal ? enderecoPrincipal.NUMERO : "",
            DESCRICAO: "",
          });
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.post("http://localhost:3000/endereco/cadastrar", info, config);
        console.log(res);
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  return (
    <div>
      <form id="form-address" onSubmit={handleSubmit}>
        <div className="input-column1">
          <label htmlFor="cep">CEP: </label>
          <input type="text" name="CEP" className="css-addr" onChange={handleChange} value={cep} maxLength={9} placeholder="Digite seu cep aqui :)" />
          {cepInvalido && <p style={{ color: "red" }}>* CEP INVÁLIDO, PREENCHA NOVAMENTE</p>}
          <label htmlFor="rua">Rua: </label>
          <input type="text" name="RUA" className="css-addr-block" value={info.RUA} readOnly />
          <label htmlFor="numero">Número: </label>
          <input type="number" name="NUMERO" onChange={(e) => setInfo({ ...info, NUMERO: e.target.value })} className="css-addr" value={info.NUMERO} />
          <label htmlFor="complemento">Complemento: </label>
          <input
            type="text"
            name="COMPLEMENTO"
            onChange={(e) => setInfo({ ...info, COMPLEMENTO: e.target.value })}
            className="css-addr"
            value={info.COMPLEMENTO}
            placeholder="apto 201, bloco 06..."
          />
        </div>
        <div className="input-column2">
          <label htmlFor="bairro">Bairro: </label>
          <input type="text" name="BAIRRO" className="css-addr-block" value={info.BAIRRO} readOnly />
          <label htmlFor="cidade">Cidade: </label>
          <input type="text" name="CIDADE" className="css-addr-block" value={info.CIDADE} readOnly />
          <label htmlFor="cidade">Descrição: </label>
          <input
            type="text"
            name="DESCRICAO"
            className="css-addr"
            onChange={(e) => setInfo({ ...info, DESCRICAO: e.target.value })}
            value={info.DESCRICAO}
            placeholder="Casa, trabalho..."
          />
          <input type="submit" id="submit-address" value="Atualizar dados" />
        </div>
      </form>
    </div>
  );
};

export default Address;
