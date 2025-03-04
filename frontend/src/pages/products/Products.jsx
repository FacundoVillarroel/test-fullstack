import React, { useState, useEffect } from "react";
import ProductForm from "../../components/productForm/ProductForm";
import ProductList from "../../components/productList/ProductList";
import { Button, Title } from "./products.styles";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router";

const SERVER_URI = "http://localhost:8080";

const Products = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  //function to Fetch product from DB
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URI}/api/products`);
      if (!response.ok) {
        window.alert("Error fetching products");
        throw new Error("Error fetching products");
      }
      const productsList = await response.json();
      setProducts(productsList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      window.alert("Error deleting the product");
      console.error("Error deleting product");
    }
  };

  const onCreateProduct = async (product) => {
    const response = await fetch(`${SERVER_URI}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      window.alert("Error creating the product");
      throw new Error("Error creating product");
    }
    const productCreated = await response.json();
    window.alert("Product created successfully");
    setProducts((prevProducts) => [...prevProducts, productCreated]);
  };

  const onUpdateProduct = async (product) => {
    const response = await fetch(`${SERVER_URI}/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: product.price,
      }),
    });
    if (!response.ok) {
      window.alert("Error updating the product");
      throw new Error("Error updating product");
    }
    const data = await response.json();
    const productUpdated = data.updatedProduct;
    //updates product list replacing the old product for the new update
    const newProductsList = products.map((product) => {
      if (product._id === productUpdated._id) {
        return productUpdated;
      } else {
        return product;
      }
    });
    setProducts(newProductsList);
    window.alert("Product updated successfully");
  };

  //Send POST or PUT request to DB to create or update a product
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      if (editProduct) {
        await onUpdateProduct(formData);
      } else {
        await onCreateProduct(formData);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      window.alert("Error creating the product");
      console.error("Error submitting form");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Title>Products</Title>
          <h2>Product Form:</h2>
          <ProductForm onSubmit={onSubmit} editProduct={editProduct} />
          <ProductList
            products={products}
            setEditProduct={setEditProduct}
            onDelete={onDelete}
          />
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      )}
    </>
  );
};

export default Products;
