var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');
var multer = require('multer');
var upload = multer({ dest: './public/upload' });

router.get('/', controller.index);
router.get('/manage', controller.manage);
router.get('/manage/:id/delete', controller.delete);
router.get('/manage/:id/edit', controller.edit);
router.post('/manage/add', upload.single('cover'), controller.add);
router.post('/manage/:id/update', controller.update);

module.exports = router;