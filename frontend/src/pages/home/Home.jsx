import React, { useState, useEffect } from "react";
import ProductForm from "../../components/productForm/ProductForm";
import ProductList from "../../components/productList/ProductList";
import { Title } from "./home.styles";

const SERVER_URI = "http://localhost:8080";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${SERVER_URI}/api/products`);
      if (!response.ok) {
        window.alert("Error fetching the product");
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

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${SERVER_URI}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        window.alert("Error creating the product");
        throw new Error("Error creating product");
      }
      const productCreated = await response.json();
      window.alert("Product created successfully")
      setProducts((prevProducts) => [...prevProducts, productCreated]);
    } catch (error) {
      console.error("Error submitting form");
    }
  };

  return (
    <div>
      <Title>Products</Title>
      <h2>Product Form:</h2>
      <ProductForm onSubmit={onSubmit} editProduct={editProduct} />
      <ProductList
        products={products}
        setEditProduct={setEditProduct}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Home;
