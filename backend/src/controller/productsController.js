const Product = require("../model/product");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error getting products", error);
  }
};

module.exports = { getAllProducts };
