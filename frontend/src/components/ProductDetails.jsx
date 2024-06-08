import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sustentavel from "../assets/sustentabilidade.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "../css/ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productId) {
          const response = await axios.get(`http://localhost:3000/produto/buscar?CODPROD=${parseInt(productId, 10)}`);
          setProduct(response.data);
        } else {
          throw new Error("ID do produto não fornecido");
        }
      } catch (error) {
        console.error("Erro ao buscar os detalhes do produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleBuy = async () => {};

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleMouseOverCart = () => {
    setShowAddToCartMessage(true);
  };

  const handleMouseOutCart = () => {
    setShowAddToCartMessage(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <div className="product-details">
        <div className="image-product-side">
          <div className="cart-icon-container" onMouseOver={handleMouseOverCart} onMouseOut={handleMouseOutCart}>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {showAddToCartMessage && <p className="add-to-cart-message">Adicionar ao carrinho</p>}
          </div>
          <img src={product.IMAGEM} alt={product.PRODUTO} />
        </div>
        <div className="description-products">
          <h1>{product.PRODUTO}</h1>
          <p>{product.DESCRICAO}</p>
          <p className="price">Preço: R${product.VALOR}</p>

          <div className="size-selection">
            <button onClick={() => handleSizeSelect("P")} className={selectedSize === "P" ? "selected" : ""}>
              P
            </button>
            <button onClick={() => handleSizeSelect("M")} className={selectedSize === "M" ? "selected" : ""}>
              M
            </button>
            <button onClick={() => handleSizeSelect("G")} className={selectedSize === "G" ? "selected" : ""}>
              G
            </button>
          </div>

          <form className="submit-producttt" onSubmit={handleBuy}>
            <input type="submit" id="submit-buy-product" value="Comprar" />
          </form>
        </div>
      </div>
      <div className="sustentability">
        <div className="sustentability-image">
          <img src={Sustentavel} alt="" />
        </div>
        <div className="sustentability-text">
          <h1 className="sustentability-paragraph">Produto Sustentável</h1>
          <p>
            Estamos comprometidos em oferecer produtos que não apenas atendam às suas necessidades, mas também respeitem o meio ambiente. Este item foi cuidadosamente produzido com
            materiais sustentáveis e práticas eco-friendly. Ao escolher este produto, você está contribuindo para um futuro mais sustentável e ajudando a reduzir o impacto
            ambiental. Juntos, podemos fazer a diferença!
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
