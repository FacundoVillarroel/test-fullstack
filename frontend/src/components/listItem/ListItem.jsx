import React from "react";

import { Button } from "./listItem.styles";

const ListItem = ({ product, setEditProduct, onDelete }) => {
  return (
    <li>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Button onClick={() => setEditProduct(product)}>Edit Product</Button>
      <Button onClick={() => onDelete(product._id)}>Delete Product</Button>
      <hr></hr>
    </li>
  );
};

export default ListItem;
