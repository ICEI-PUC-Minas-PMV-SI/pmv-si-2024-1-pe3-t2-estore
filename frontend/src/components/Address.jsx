import React from "react";
import "../css/Address.css";

const Address = () => {
  return (
    <div>
      <form id="form-address">
        <div class="input-column1">
          <label htmlFor="cep">CEP: </label>
          <input type="number" name="cep" className="css-addr" />
          <label htmlFor="rua">Rua: </label>
          <input type="text" name="rua" className="css-addr" />
          <label htmlFor="numero">Número: </label>
          <input type="number" name="numero" className="css-addr" />
          <label htmlFor="complemento">Complemento: </label>
          <input type="text" name="complemento" className="css-addr" />
        </div>
        <div class="input-column2">
          <label htmlFor="bairro">Bairro: </label>
          <input type="text" name="bairro" className="css-addr" />
          <label htmlFor="cidade">Cidade: </label>
          <input type="text" name="cidade" className="css-addr" />
          <input type="submit" id="submit-address" value="Atualizar dados" />
        </div>
      </form>
    </div>
  );
};

export default Address;
