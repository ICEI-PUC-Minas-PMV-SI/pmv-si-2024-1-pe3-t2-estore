import React from "react";
import Product from "./fragments/Products";
import ImageProduct from "../assets/products/camiseta-feminina-estampada.jpg";

const Dashboard = () => {
  return (
    <>
      <div className="list-products">
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
        <Product title="Camiseta Feminina - Obras de arte" image={ImageProduct} price="R$ 150" />
      </div>
    </>
  );
};

export default Dashboard;
