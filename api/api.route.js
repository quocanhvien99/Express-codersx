var express = require('express');
var router = express.Router();
var registerController = require('./controllers/register.controller');
var loginController = require('./controllers/login.controller');
var transactionController = require('./controllers/transaction.controller');
var profileController = require('./controllers/profile.controller.js');
var cartController = require('./controllers/cart.controller.js');
var bookController = require('./controllers/book.controller');
var authMiddleware = require('./middlewares/auth.middleware');

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/books/', bookController.get);
router.get('/books/:id', bookController.getOne);

router.use(authMiddleware);

router.get('/transactions', transactionController.get);
router.post('/transactions/create', transactionController.create);
router.patch('/transactions/complete', transactionController.complete);

router.get('/profile', profileController.getInfo);
router.patch('/profile/update', profileController.update);

router.post('/cart/add', cartController.addToCart);
router.post('/cart/create', cartController.createTransaction);

module.exports = router;