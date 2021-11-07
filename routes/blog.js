// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/feed', blogController.getPosts); 

module.exports = router;