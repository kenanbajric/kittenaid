// core imports
const express = require('express');

// my imports
const isAuth = require('../middleware/is-auth');
const aidReqController = require('../controllers/aid-request');

const router = express.Router();

router.post('/createaidreq', isAuth, aidReqController.createReqPost);
router.post('/admingetreq', isAuth, aidReqController.adminGetReqPosts); //isAuth zamjeniti sa isAdmin middlewareom
router.post('/admingetreq/:reqId', isAuth, aidReqController.approveReq); //isAuth zamjeniti sa isAdmin middlewareom

module.exports = router;