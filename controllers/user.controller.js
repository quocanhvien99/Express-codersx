var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('users', {
        users: db.get('users').value()
    });
};
module.exports.delete = function(req, res) {
    db.get('users').remove({id: req.params.id}).write();
    res.redirect('back');
};
module.exports.edit = function(req, res) {
    res.render('user-edit', {
        id: req.params.id
    });
   };
module.exports.add = function(req, res) {
    if (req.body.username.length > 30) {
        res.render('users', {
            error: 'Username không được nhập quá 30 ký tự.',
            values: req.body,
            users: db.get('users').value()
        });
    } else {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }    
};
module.exports.update = function(req, res) {    
    db.get('users').find({ id: req.params.id }).assign({ email: req.body.email }).write();
    db.get('users').find({ id: req.params.id }).assign({ passwd: req.body.passwd }).write();    
    res.redirect('/users');
};