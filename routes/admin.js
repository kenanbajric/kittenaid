// core imports
const express = require('express');
const multer = require('multer');

// my imports
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const adminController = require('../controllers/admin');

const router = express.Router();

// for images naming 
const { v4: uuidv4 } = require('uuid');

// image upload function
const uploadFunction = (dest) => {
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dest);
        },
        filename: function(req, file, cb) {
            cb(null, uuidv4())
        }
    })
    
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    
    // multer - image upload
    const upload = multer({storage: fileStorage, fileFilter: fileFilter});
    
    return upload;
};

router.post('/createproduct', isAuth, isAdmin, uploadFunction('images/product-images').single('image'), adminController.createProduct); 
router.patch('/product/:productId', isAuth, uploadFunction('images/product-images').single('image'), isAdmin, adminController.updateProduct); 
router.delete('/product/:productId', isAuth, isAdmin, adminController.deleteProduct); 
router.post('/createpost', isAuth, isAdmin, uploadFunction('images/blog-images').single('image'), adminController.createPost); 
router.patch('/post/:postId', isAuth, uploadFunction('images/blog-images').single('image'), isAdmin, adminController.updatePost); 
router.delete('/post/:postId', isAuth, isAdmin, adminController.deletePost); 

module.exports = router;