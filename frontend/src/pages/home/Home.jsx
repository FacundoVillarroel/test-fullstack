import React, { useState, useEffect } from "react";
import ProductList from "../../components/productList/ProductList";
import { Title } from "./home.styles";

const serverURI = "http://localhost:8080";
const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${serverURI}/api/products`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const productsList = await response.json();
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Title>Products</Title>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
