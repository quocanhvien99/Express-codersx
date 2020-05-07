var express = require('express');
var router = express.Router();
var controller = require('../controllers//profile.controller');
var multer = require('multer');
var upload = multer({ dest: './public/upload' });

router.get('/', controller.index);
router.get('/avatar', controller.avatar);
router.post('/', controller.update);
router.post('/avatar', upload.single('avatar'), controller.postAvatar)

module.exports = router;