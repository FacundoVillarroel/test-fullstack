const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controller/productsController");

const ProductsRouter = express.Router();

ProductsRouter.get("/", getAllProducts);

ProductsRouter.post("/", createProduct);

module.exports = ProductsRouter;
