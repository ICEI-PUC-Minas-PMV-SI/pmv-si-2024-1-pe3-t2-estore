import React, { useState } from "react";
import "../css/Account.css";
import Profile from "./Profile.jsx";
import Address from "./Address.jsx";
import History from "./History.jsx";

const Account = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;

    if (checkboxId === selectedCheckbox) {
      setSelectedCheckbox(null);
      return;
    }

    setSelectedCheckbox(checkboxId);
  };

  return (
    <>
      <div className="account-page">
        <div className="header-account">
          <h1>Informações da sua conta</h1>
        </div>
        <div className="header-container-account">
          <aside className="left-container-account">
            <input type="checkbox" name="Minha conta" id="checkbox-1a" checked={selectedCheckbox === "checkbox-1a"} onChange={handleCheckboxChange} />
            <label name="Minha conta" id="checkbox-1b" htmlFor="checkbox-1a">
              Minha conta
            </label>

            <input type="checkbox" name="Minha conta" id="checkbox-2a" checked={selectedCheckbox === "checkbox-2a"} onChange={handleCheckboxChange} />
            <label name="Minha conta" id="checkbox-2b" htmlFor="checkbox-2a">
              Meu endereço
            </label>

            <input type="checkbox" name="Minha conta" id="checkbox-3a" checked={selectedCheckbox === "checkbox-3a"} onChange={handleCheckboxChange} />
            <label name="Minha conta" id="checkbox-3b" htmlFor="checkbox-3a">
              Meus pedidos
            </label>
          </aside>
          <article className="right-container-account">
            {selectedCheckbox === null ? (
              <Profile />
            ) : selectedCheckbox === "checkbox-2a" ? (
              <Address />
            ) : selectedCheckbox === "checkbox-1a" ? (
              <Profile />
            ) : (
              selectedCheckbox && <History />
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default Account;
