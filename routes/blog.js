// core imports
const express = require('express');

// my imports
const blogController = require('../controllers/blog');
const pagination = require('../middleware/pagination-function');

// models 
const Post = require('../models/blog-post');

const router = express.Router();

router.get('/posts', pagination(Post), blogController.getPosts);  // testirati paginaciju
router.get('/post/:postId', blogController.getPost); 
router.post('/post/:postId', blogController.upvotePost);

module.exports = router;