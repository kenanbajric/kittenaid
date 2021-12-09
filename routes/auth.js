// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');
const uploadFunction = require('../middleware/upload-function');

const router = express.Router();

router.post('/signup', uploadFunction('images/avatar-images').single('image'), authController.signup);
router.post('/login', authController.login);
router.post('/updatepw', isAuth, authController.updatePw);
router.post('resetpw', authController.resetPw);

module.exports = router;