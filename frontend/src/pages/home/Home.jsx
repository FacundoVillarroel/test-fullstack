import React, { useState, useEffect } from "react";
import ProductForm from "../../components/productForm/ProductForm";
import ProductList from "../../components/productList/ProductList";
import { Title } from "./home.styles";

const serverURI = "http://localhost:8080";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

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

  const onDelete = (id) => {
    console.log("Delete Product", id);
  };

  return (
    <div>
      <Title>Products</Title>
      <h2>Product Form:</h2>
      <ProductForm editProduct={editProduct} />
      <ProductList
        products={products}
        setEditProduct={setEditProduct}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Home;
