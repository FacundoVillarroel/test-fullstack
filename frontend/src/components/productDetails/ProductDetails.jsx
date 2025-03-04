import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../listItem/listItem.styles";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_IP}/api/products/${id}`
      );
      if (!response.ok) {
        throw new Error("Error getting product with id: " + id);
      }
      const productFound = await response.json();
      setProduct(productFound);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [id, fetchProduct]);

  return (
    <div>
      <h1>Product</h1>
      <p>Name: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <Button onClick={() => navigate("/products")}>Go to product List</Button>
    </div>
  );
};

export default ProductDetails;
