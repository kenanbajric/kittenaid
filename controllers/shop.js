// my imports
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      message: "Products fetched successufully",
      products: products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    res.status(200).json({
      message: "Product fetched successufully",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};


