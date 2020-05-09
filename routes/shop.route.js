var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send("<h1>Mình đang chạy deadline với thi giữa kì ở trường nên lúc rảnh chỉ xem được bài giảng, bài này sẽ làm sau ^.^</h1>");
});

module.exports = router;