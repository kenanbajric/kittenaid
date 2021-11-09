// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', isAuth, shopController.getProducts); 
router.get('/product/:productId', isAuth, shopController.getProduct); 
router.post('/product/:productId', isAuth, shopController.addToCart);
router.delete('/product/:productId', isAuth, shopController.removeFromCart); 
router.delete('/cart', isAuth, shopController.deleteCart); 
router.post('/order', isAuth, shopController.postOrder); // treba zavrsiti 

module.exports = router;