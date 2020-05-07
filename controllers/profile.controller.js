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

        msg: 'Thay đổi thông tin thành công.'
    });
};
module.exports.avatar = function(req, res) {
    res.render('profile/avatar');
};

module.exports.postAvatar = async function(req, res) {
    var result = await cloudinary.v2.uploader.upload(req.file.path);
    await User.findByIdAndUpdate(req.signedCookies['user-id'], { avatar: result.url });

    res.redirect('/profile');
};