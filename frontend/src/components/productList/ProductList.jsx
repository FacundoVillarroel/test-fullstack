import React from "react";

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
