import React from "react";
import ListItem from "../listItem/ListItem";

const ProductList = ({ products, setEditProduct, onDelete }) => {

  return (
    <ul>
      {products.map((product) => (
        <ListItem
          product={product}
          key={product._id}
          setEditProduct={setEditProduct}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ProductList;
