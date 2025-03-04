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

//get product by id
const getProductById = async (req,res,next) => {
try {
  const {id} = req.params;
  const productFound = await Product.findById(id)
  if(!productFound){
    res.status(404).send({message:"product not found"})
    return
  }
  res.send(productFound)
} catch (error) {
    console.error("Error getting product", error);
    res.status(500).send("Error getting product");
}
}

//create products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const product = { name, description, price };
    const productCreated = await new Product(product).save();
    if (!productCreated) {
      res.status(500).send("Error creating product");
      return;
    }
    res.status(201).send(productCreated);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).send("Error creating product");
  }
};

//update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = { name, description, price };
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      product,
      { new: true }
    );
    if(!updatedProduct){
      res.status(404).send({message:"Product not found", updated:false})
      return
    }
    res.send({updated:true, updatedProduct})
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).send({message:"Error updating product", updated:false});
  }
}

//delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      res.status(404).send("Product not found");
      return;
    }
    res.send({ deleted: true, productDeleted });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).send("Error deleting product");
  }
};

module.exports = { getAllProducts,getProductById, createProduct,updateProduct, deleteProduct };
