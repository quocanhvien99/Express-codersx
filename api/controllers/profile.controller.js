var User = require('../../models/user.model');

module.exports.getInfo = async function(req, res) {
    var userid = req.user.userId;
    var user = await User.findById(userid);
    res.status(200).json(user);    
};

module.exports.update = async function(req, res) {
    var email = req.body.email;
    var phone = req.body.phone;
    var avatar = req.body.avatar;

    if (email) {
        await User.findByIdAndUpdate(req.user.userId, { email: email });
    }
    if (phone) {
        await User.findByIdAndUpdate(req.user.userId, { phone: phone });
    }
    if (avatar) {
        await User.findByIdAndUpdate(req.user.userId, { avatar: avatar });
    }
    res.status(200).send('Profile change successful');    
};