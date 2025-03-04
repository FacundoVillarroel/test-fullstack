const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
} = require("../controller/productsController");

const ProductsRouter = express.Router();

ProductsRouter.get("/", getAllProducts);

ProductsRouter.post("/", createProduct);

ProductsRouter.delete("/:id", deleteProduct);

module.exports = ProductsRouter;
