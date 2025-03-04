import React from "react";

import { useNavigate } from "react-router";

import { Container, Title, Button } from "../products/products.styles";

const Home = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/products");
  };

  return (
    <Container>
      <Title>Home</Title>
      <Button onClick={onNavigate}>Go to products.</Button>
    </Container>
  );
};

export default Home;
