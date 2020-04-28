var express = require('express');
var router = express.Router();
var controller = require('../controllers/transaction.controller')

router.get('/', controller.index);
router.get('/:id/complete', controller.complete);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
module.exports = router;