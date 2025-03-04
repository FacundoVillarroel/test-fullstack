import React, { useEffect, useState } from "react";

import { Form, InputContainer, Input } from "./productForm.styles";

const initialState = { name: "", description: "", price: 0 };

const ProductForm = ({ onSubmit, editProduct }) => {
  const [formData, setFormData] = useState(initialState);

  //handle change each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //set the data of the product to edit if there is one.
  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <InputContainer>
        <label htmlFor="name">Product's Name:</label>
        <Input
          type={"text"}
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="description">Description:</label>
        <Input
          type={"text"}
          name="description"
          value={formData.description}
          required
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="price">Price:</label>
        <Input
          type={"number"}
          name="price"
          value={formData.price}
          required
          onChange={handleChange}
        />
      </InputContainer>

      <button type="submit">{editProduct ? "Update" : "Create"} product</button>
    </Form>
  );
};

export default ProductForm;
