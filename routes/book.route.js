var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');
router.get('/', controller.index);
router.get('/:id/delete', controller.delete);
router.get('/:id/edit', controller.edit);
router.post('/add', controller.add);
router.post('/:id/update', controller.update);

module.exports = router;