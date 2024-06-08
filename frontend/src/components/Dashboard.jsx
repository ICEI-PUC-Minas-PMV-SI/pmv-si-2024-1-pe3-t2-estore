import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./fragments/Products";
import axios from "axios";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const url_fetchproducts = "http://localhost:3000/produto/listar";

  const override = css`
    display: block;
    height: 100vh;
    margin: 0 auto;
    border-color: red;
  `;

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(url_fetchproducts, { params: { page } });

      const newProducts = response.data;

      // Se não houver novos produtos, setHasMore para false para interromper a solicitação adicional
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // Caso contrário, substitua os produtos existentes pelos novos produtos
        setProducts(newProducts);
      }
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  let prevScrollPos = window.scrollY || window.pageYOffset;

  const handleScroll = () => {
    if (!hasMore || loading) return;

    const currentScrollPos = window.scrollY || window.pageYOffset;

    // Verifica se o usuário está rolando para baixo e está próximo do final da página
    if (currentScrollPos > prevScrollPos && window.innerHeight + currentScrollPos >= document.documentElement.offsetHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }

    prevScrollPos = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="list-products">
      {products.map((product, index) => (
        <Link to={`/product/${product.CODPROD}`} key={`${product.CODPROD}-${index}`}>
          <Product title={product.PRODUTO} image={product.IMAGEM} price={product.VALOR} />
        </Link>
      ))}

      {loading && hasMore && (
        <div style={spinnerContainerStyle}>
          <ClipLoader color={"#000"} loading={loading} css={override} size={150} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
