import React, { useState, useEffect } from "react";
import ProductForm from "../../components/productForm/ProductForm";
import ProductList from "../../components/productList/ProductList";
import { Title } from "./home.styles";

const SERVER_URI = "http://localhost:8080";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  //function to Fetch product from DB
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${SERVER_URI}/api/products`);
      if (!response.ok) {
        window.alert("Error fetching products");
        throw new Error("Error fetching products");
      }
      const productsList = await response.json();
      setProducts(productsList);
    } catch (error) {
      window.alert("Error fetching the product");
      console.error("Error fetching products");
    }
  };

  //initially fetch all products in DB
  useEffect(() => {
    fetchProducts();
  }, []);

  //function to delete product on DB by its ID
  const onDelete = async (id) => {
    try {
      const response = await fetch(`${SERVER_URI}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        window.alert("Error deleting products");
        throw new Error("Error deleting products");
      }
      const data = await response.json();

      const newProductsList = products.filter(
        (product) => product._id !== data.productDeleted._id
      );
      window.alert("Product deleted successfully!");
      setProducts(newProductsList);
    } catch (error) {
      window.alert("Error deleting the product");
      console.error("Error deleting product");
    }
  };

  //Send POST request to DB to create a product
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
      window.alert("Product created successfully");
      setProducts((prevProducts) => [...prevProducts, productCreated]);
    } catch (error) {
      window.alert("Error creating the product");
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
