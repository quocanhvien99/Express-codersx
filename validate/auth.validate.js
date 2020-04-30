var db = require('../db')
module.exports.auth = function(req, res, next) {
    if (!req.signedCookies) {
        res.redirect('/login');
        return;
    }
    if (!db.get('users').find({ id: req.signedCookies['user-id'] }).value()) {       
        res.redirect('/login');
        return;
    }
    next();
};