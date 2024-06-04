import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./fragments/Products";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const url_fetchproducts = "http://localhost:3000/produto/listar";

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(url_fetchproducts, { params: { page } });

      const newProducts = response.data;
      const uniqueProducts = new Set([...products, ...newProducts]);
      setProducts(Array.from(uniqueProducts));

      if (newProducts.length === 0) {
        setHasMore(false);
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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
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
    </div>
  );
};

export default Dashboard;
