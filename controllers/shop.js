// my imports
const Product = require("../models/product");
const User = require("../models/user");

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
    console.log(product.imageUrl);
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

exports.addToCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const product = await Product.findById(req.params.productId);
    let newQuantity = 1;
    const index = user.cart.items.findIndex(currentProduct => currentProduct.productId.toString() === product._id.toString());
    if (index >= 0) {
      user.cart.items[index].quantity += 1;
    } else {
      const cartItem = {
        productId: product,
        quantity: newQuantity
      }
      user.cart.items.push(cartItem);
    }
    user.save();
    res.status(200).json({
      message: "Product added to cart successufully",
      cart: user.cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.removeFromCart = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const productId = req.params.productId;
  const updatedCartItems = user.cart.items.filter(cartItem => {
    return cartItem.productId.toString() !== productId.toString();
  });
  user.cart.items = updatedCartItems;
  user.save();
  res.status(200).json({
    message: "Product removed from cart successufully",
    cart: user.cart,
  });
}

exports.deleteCart = async (req, res, next) => {
  
}