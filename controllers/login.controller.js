var bcrypt = require('bcrypt');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('login');
};

module.exports.post = function(req, res) {
    var user = db.get('users').find({ username: req.body.username }).value();
    if (!user) {
        res.render('login', {
            error: 'User does not exist.',
            value: req.body
        });
        return;
    }

    var myPlaintextPassword = req.body.passwd;
    var hash = user.passwd;
    if (user.wrongLoginCount === 4) {
        res.render('login', {
            error: 'You have exceeded 4 attempts.'       
        });  
        return;
    }
    if (bcrypt.compareSync(myPlaintextPassword, hash)) {
        res.cookie('user-id', user.id, {
            signed: true
        });
        res.redirect('/');
        return;
    }
    if (user.wrongLoginCount) {        
        db.get('users').find({ username: req.body.username }).assign({ wrongLoginCount: user.wrongLoginCount + 1 }).write();
    } else {
        db.get('users').find({ username: req.body.username }).assign({ wrongLoginCount: 1 }).write();
    }
    res.render('login', {
        error: 'Wrong password.'       
    });       
};