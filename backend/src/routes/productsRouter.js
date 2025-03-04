const express = require("express");
const { getAllProducts } = require("../controller/productsController");

const ProductsRouter = express.Router();

ProductsRouter.get("/", getAllProducts);

module.exports = ProductsRouter;
