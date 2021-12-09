// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const adminController = require('../controllers/admin');
const uploadFunction = require('../middleware/upload-function');

const router = express.Router();

router.post('/product', isAuth, isAdmin, uploadFunction('images/product-images').single('image'), adminController.createProduct); 
router.patch('/product/:productId', isAuth, uploadFunction('images/product-images').single('image'), isAdmin, adminController.updateProduct); 
router.delete('/product/:productId', isAuth, isAdmin, adminController.deleteProduct); 
router.post('/post', isAuth, isAdmin, uploadFunction('images/blog-images').single('image'), adminController.createPost); 
router.patch('/post/:postId', isAuth, uploadFunction('images/blog-images').single('image'), isAdmin, adminController.updatePost); 
router.delete('/post/:postId', isAuth, isAdmin, adminController.deletePost); 
router.post('/category', isAuth, isAdmin, adminController.createCategory); 
router.get('/category', isAuth, isAdmin, adminController.category); //fetch all categories
router.delete('/category/:categoryId', isAuth, isAdmin, adminController.deleteCategory); 
router.patch('/category/:categoryId', isAuth, isAdmin, adminController.updateCategory); 

module.exports = router;