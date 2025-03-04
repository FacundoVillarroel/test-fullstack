import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ProductDetails from "./components/productDetails/ProductDetails";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";

function App() {
  return (
    <div style={{ flex: 1 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
