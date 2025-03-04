import React, { useState, useEffect } from "react";
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

  console.log("PRODUCTS:", products);

  return <div>Home</div>;
};

export default Home;
