var User = require('../models/user.model');
module.exports.auth = async function(req, res, next) {
    if (!req.signedCookies) {
        res.redirect('/login');
        return;
    }
    var user = await User.findById(req.signedCookies['user-id']);
    if (!user) {       
        res.redirect('/login');
        return;
    }
    next();
};