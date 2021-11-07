// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/updatepw', isAuth, authController.updatePw);


module.exports = router;