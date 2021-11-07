// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products', isAuth, shopController.getProducts); 
router.get('/product/:productId', isAuth, shopController.getProduct); 

module.exports = router;