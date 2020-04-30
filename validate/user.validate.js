var db = require('../db')
module.exports.add = function(req, res, next) {
    if (req.body.username.length > 30) {
        res.render('users', {
            error: 'Username không được nhập quá 30 ký tự.',
            values: req.body,
            users: db.get('users').value()
        });
        return;
    }
    
    if (db.get('users').find({ email: req.body.email}).value()) {
        res.render('users', {
            error: 'Đã có tài khoản sử dụng email này.',
            values: req.body,
            users: db.get('users').value()
        });
        return;
    }
    next();
}