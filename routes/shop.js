// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop');
const pagination = require('../middleware/pagination-function');

// models 
const Product = require('../models/product');

const router = express.Router();

router.get('/products', isAuth, pagination(Product), shopController.getProducts); 
router.get('/products/:productId', isAuth, shopController.getProduct); 
router.post('/products/:productId', isAuth, shopController.addToCart);
router.delete('/products/:productId', isAuth, shopController.removeFromCart); 
router.delete('/cart', isAuth, shopController.deleteCart); 
router.post('/order', isAuth, shopController.postOrder); // treba zavrsiti 

module.exports = router;