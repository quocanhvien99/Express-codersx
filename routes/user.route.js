var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate');

router.get('/', controller.index);
router.get('/:id/delete', controller.delete);
router.get('/:id/edit', controller.edit);
router.post('/add', validate.add, controller.add);
router.post('/:id/update', controller.update);

module.exports = router;