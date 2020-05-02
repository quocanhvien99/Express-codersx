var db = require('../db');
var cloudinary = require('cloudinary');

module.exports.index = function(req, res) {
    res.render('profile/index', {
        user: db.get('users').find({ id: req.signedCookies['user-id'] }).value()
    });
};
module.exports.update = function(req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    if (email) {
        db.get('users').find({ id: req.signedCookies['user-id'] }).assign({ email: email }).write()
    }
    if (phone) {
        db.get('users').find({ id: req.signedCookies['user-id'] }).assign({ phone: phone }).write()
    }
    res.render('profile/index', {
        user: db.get('users').find({ id: req.signedCookies['user-id'] }).value(),
        msg: 'Thay đổi thông tin thành công.'
    });
};
module.exports.avatar = function(req, res) {
    res.render('profile/avatar');
};
module.exports.postAvatar = function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
        db.get('users').find({ id: req.signedCookies['user-id'] }).assign({ avatar: result.url }).write()
    });
    res.redirect('/profile');
};