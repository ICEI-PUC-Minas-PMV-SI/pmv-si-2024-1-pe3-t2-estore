import React from "react";
import "../css/Cart.css";

const Cart = () => {
  return (
    <div className="cart">
      <div className="h1-header-cart">
        <h1>Carrinho de compras</h1>
      </div>
      <div className="cart-container">
        <div className="left-cart-container">
          <div className="product-cart">
            <p>OI</p>
          </div>
        </div>
        <div className="right-cart-container">
          <h1>
            Subtotal: (X produtos): <b> R$ 0.00 </b>
          </h1>
          <input type="button" value="Fechar pedido" id="close-cart" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
