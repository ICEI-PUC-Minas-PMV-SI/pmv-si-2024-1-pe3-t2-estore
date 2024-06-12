import React, { useState } from "react";
import Inputs from "./fragments/Inputs";
import axios from "axios";
import "../css/ProductRegistration.css";

const ProductRegistration = () => {
  // Route to register products
  const url_register_product = "http://localhost:3000/produto/cadastrar";

  // // // // // // // // // // // // // // // // // // // // // // // //
  // Product field
  // // // // // // // // // // // // // // // // // // // // // // // //
  const [product, setProduct] = useState({
    PRODUTO: "",
    DESCRICAO: "",
    VALOR: 0,
    ESTOQUE: 0,
    DESCONTO: 0,
    IMAGEM: "",
    CATEGORIA: "",
  });

  // // // // // // // // // // // // // // // // // // // // // // // //
  // getting inputs value to product field
  // // // // // // // // // // // // // // // // // // // // // // // //

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // // // // // // // // // // // // // // // // // // // // // // // //
  // update product image (conversion png - base64)
  // // // // // // // // // // // // // // // // // // // // // // // //
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          IMAGEM: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // // // // // // // // // // // // // // // // // // // // // // // //
  // upload product
  // // // // // // // // // // // // // // // // // // // // // // // //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const registerProduct = await axios.post(url_register_product, product, config);
      setProduct({
        PRODUTO: "",
        DESCRICAO: "",
        VALOR: 0,
        ESTOQUE: 0,
        DESCONTO: 0,
        IMAGEM: "",
        CATEGORIA: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
    console.log(product);
  };

  return (
    <form className="product-registration" onSubmit={handleSubmit}>
      <div className="form-group-container">
        <div className="column">
          <div className="form-group">
            <Inputs label="Título do Produto:" type="text" name="PRODUTO" id="title" value={product.PRODUTO} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <Inputs
              label="Descrição do Produto:"
              type="text"
              name="DESCRICAO"
              id="description"
              value={product.DESCRICAO}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoria:</label>
            <select name="CATEGORIA" id="category" value={product.CATEGORIA} onChange={handleChange} className="form-control" required>
              <option value="">Selecione a categoria</option>
              <option value="FEMININO">FEMININO</option>
              <option value="MASCULINO">MASCULINO</option>
            </select>
          </div>
          <div className="form-group">
            <Inputs label="Imagem do Produto:" type="file" name="IMAGEM" id="image" accept="image/*" onChange={handleImageChange} className="form-control" required />
          </div>
        </div>
        <div className="column">
          <div className="form-group">
            <Inputs label="Preço:" type="number" name="VALOR" id="price" value={product.VALOR} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <Inputs label="Estoque:" type="number" name="ESTOQUE" id="stock" value={product.ESTOQUE} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <Inputs label="Desconto:" type="number" name="DESCONTO" id="discount" value={product.DESCONTO} onChange={handleChange} className="form-control" required />
          </div>
        </div>
      </div>
      <div className="submit-product">
        <input type="submit" value="Cadastrar produto" />
      </div>
    </form>
  );
};

export default ProductRegistration;
