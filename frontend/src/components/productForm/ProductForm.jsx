import React, { useState } from "react";

const initialState = { name: "", description: "", price: 0 };

const ProductForm = ({ editProduct }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <input
        type={"text"}
        name="name"
        value={formData.name}
        required
        onChange={handleChange}
      />
      <input
        type={"text"}
        name="description"
        value={formData.description}
        required
        onChange={handleChange}
      />
      <input
        type={"number"}
        name="price"
        value={formData.price}
        required
        onChange={handleChange}
      />
      <button type="submit"> create product</button>
    </form>
  );
};

export default ProductForm;
