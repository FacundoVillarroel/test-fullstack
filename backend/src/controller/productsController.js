const Product = require("../model/product");

//get products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).send("Error getting products");
  }
};

//create products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const product = { name, description, price };
    const productCreated = await new Product(product).save();
    if (!productCreated) {
      res.status(500).send("Error creating product");
    }
    res.status(201).send(productCreated);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send("Error creating product");
  }
};

module.exports = { getAllProducts, createProduct };
