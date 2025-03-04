const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productsController");

const ProductsRouter = express.Router();

ProductsRouter.get("/", getAllProducts);

ProductsRouter.post("/", createProduct);

ProductsRouter.put("/:id", updateProduct);

ProductsRouter.delete("/:id", deleteProduct);

module.exports = ProductsRouter;
