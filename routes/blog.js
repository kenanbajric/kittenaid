// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/posts', blogController.getPosts); 
router.get('/post/:postId', blogController.getPost); 
router.post('/post/:postId', blogController.upvotePost);

module.exports = router;