<<<<<<< HEAD
var User = require('../models/user.model');
var cloudinary = require('cloudinary');

module.exports.index = async function(req, res) {
    res.render('profile/index', {
        user: await User.findById(req.signedCookies['user-id'])
    });
};
module.exports.update = async function(req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    if (email) {
        await User.findByIdAndUpdate(req.signedCookies['user-id'], { email: email });
    }
    if (phone) {
        await User.findByIdAndUpdate(req.signedCookies['user-id'], { phone: phone });
    }
    res.render('profile/index', {
        user: await User.findById(req.signedCookies['user-id']),
=======
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
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
        msg: 'Thay đổi thông tin thành công.'
    });
};
module.exports.avatar = function(req, res) {
    res.render('profile/avatar');
};
<<<<<<< HEAD
module.exports.postAvatar = async function(req, res) {
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    await User.findByIdAndUpdate(req.signedCookies['user-id'], { avatar: result.url });
=======
module.exports.postAvatar = function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
        db.get('users').find({ id: req.signedCookies['user-id'] }).assign({ avatar: result.url }).write()
    });
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    res.redirect('/profile');
};