var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');
var requireAuth = require('../validate/auth.validate');

router.get('/add/:bookId', controller.addToCart);
router.get('/create', requireAuth.auth, controller.createTransaction),

module.exports = router;
