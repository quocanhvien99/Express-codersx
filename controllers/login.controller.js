var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var User = require('../models/user.model');

module.exports.index = function(req, res) {
    res.render('login');
};

module.exports.post = async function(req, res) {
    var user = await User.findOne({ username: req.body.username });    
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
    var compareHash = await bcrypt.compare(myPlaintextPassword, hash);
    console
    if (compareHash) {
        res.cookie('user-id', user.id, {
            signed: true
        });
        res.redirect('/');
        return;
    }
    if (user.wrongLoginCount + 1 === 3) {
        var msg = {
            to: user.email,
            from: 'quocanhvien99@gmail.com',
            subject: 'Warning from quoc anh',
            text: 'You have exceeded 3 attempts.',
        };
        sgMail.send(msg);
    }
    if (user.wrongLoginCount) {      
        User.findOneAndUpdate({ username: req.body.username }, { wrongLoginCount: user.wrongLoginCount + 1 });   
    } else {
        User.findOneAndUpdate({ username: req.body.username }, { wrongLoginCount: 1 });
    }
    res.render('login', {
        error: 'Wrong password.'       
    });       
};