<<<<<<< HEAD
var User = require('../models/user.model');
module.exports.auth = async function(req, res, next) {
=======
var db = require('../db')
module.exports.auth = function(req, res, next) {
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    if (!req.signedCookies) {
        res.redirect('/login');
        return;
    }
<<<<<<< HEAD
    var user = await User.findById(req.signedCookies['user-id']);
    if (!user) {       
=======
    if (!db.get('users').find({ id: req.signedCookies['user-id'] }).value()) {       
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
        res.redirect('/login');
        return;
    }
    next();
};