var User = require('../models/user.model');
var pagination = require('../controllers/pagination.controller');

module.exports.add = async function(req, res, next) {
    if (req.body.username.length > 30) {
        var page =  parseInt(req.query.page) || 1;
        var totalPages = Math.ceil(await User.estimatedDocumentCount() / 5);
        var previous = page > 0 ? page - 1 : null;
        var next = page < totalPages ? page + 1 : null;

        res.render('users', {
            error: 'Username không được nhập quá 30 ký tự.',
            values: req.body,
            users: pagination.content(await User.find(), page),
            pages: pagination.nav(page, totalPages),
            previous: previous,
            next: next
        });
        return;
    }
    
    if (await User.findOne({ email: req.body.email})) {
        var page =  parseInt(req.query.page) || 1;
        var totalPages = Math.ceil(await User.estimatedDocumentCount() / 5);
        var previous = page > 0 ? page - 1 : null;
        var next = page < totalPages ? page + 1 : null;
        
        res.render('users', {
            error: 'Đã có tài khoản sử dụng email này.',
            values: req.body,
            users: pagination.content(await User.find(), page),
            pages: pagination.nav(page, totalPages),
            previous: previous,
            next: next
        });
        return;
    }
    next();
}