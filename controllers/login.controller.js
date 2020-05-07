var bcrypt = require('bcrypt');
<<<<<<< HEAD
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var User = require('../models/user.model');
=======
var db = require('../db');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6

module.exports.index = function(req, res) {
    res.render('login');
};

<<<<<<< HEAD
module.exports.post = async function(req, res) {
    var user = await User.findOne({ username: req.body.username });    
=======
module.exports.post = function(req, res) {
    var user = db.get('users').find({ username: req.body.username }).value();
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
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
<<<<<<< HEAD
    var compareHash = await bcrypt.compare(myPlaintextPassword, hash);
    console
    if (compareHash) {
=======
    if (bcrypt.compareSync(myPlaintextPassword, hash)) {
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
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
<<<<<<< HEAD
    if (user.wrongLoginCount) {      
        User.findOneAndUpdate({ username: req.body.username }, { wrongLoginCount: user.wrongLoginCount + 1 });   
    } else {
        User.findOneAndUpdate({ username: req.body.username }, { wrongLoginCount: 1 });
=======
    if (user.wrongLoginCount) {        
        db.get('users').find({ username: req.body.username }).assign({ wrongLoginCount: user.wrongLoginCount + 1 }).write();        
    } else {
        db.get('users').find({ username: req.body.username }).assign({ wrongLoginCount: 1 }).write();
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    }
    res.render('login', {
        error: 'Wrong password.'       
    });       
};