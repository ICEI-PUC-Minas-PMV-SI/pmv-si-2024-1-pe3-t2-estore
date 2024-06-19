import React, { useState } from "react";
import "../css/Cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProducts from "../components/fragments/cartProducts";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  return (
    <div className="cart">
      <div className="h1-header-cart">
        <h1>Seu carrinho de compras</h1>
      </div>
      <div className="cart-container">
        <div className="left-cart-container">
          <div className="product-cart">
            <CartProducts onTotalChange={handleTotalChange} />
          </div>
        </div>
        <div className="right-cart-container">
          <h1>
            Subtotal: <b> R${total.toFixed(2)} </b>
          </h1>
          <input type="button" value="Fechar pedido" id="close-cart" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
