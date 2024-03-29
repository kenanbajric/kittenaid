// core imports
const express = require('express');

// my imports
const blogController = require('../controllers/blog');
const pagination = require('../middleware/pagination-function');
const isAuth = require('../middleware/is-auth');

// models 
const Post = require('../models/blog-post');

const router = express.Router();

router.get('/', pagination(Post), blogController.getPosts);
router.get('/:categoryId', pagination(Post), blogController.category);
router.get('/:postId', blogController.getPost); 
router.post('/:postId', blogController.upvotePost);
router.post('/:postId/comments', isAuth, blogController.postComment);

module.exports = router;