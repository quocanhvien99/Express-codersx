var bcrypt = require('bcrypt');
var shortid = require('shortid');
var db = require('../db');
var pagination = require('./pagination.controller');

module.exports.index = function(req, res) {
    var page =  parseInt(req.query.page) || 1;
    var totalPages = Math.ceil(db.get('users').size().value() / 5);
    var previous = page > 0 ? page - 1 : null;
    var next = page < totalPages ? page + 1 : null;     
    res.render('users', {
        users: pagination.content(db.get('users').value(), page),
        pages: pagination.nav(page, totalPages),
        previous: previous,
        next: next
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
    const saltRounds = 10;
    const myPlaintextPassword = req.body.passwd; 
    req.body.id = shortid.generate();
    bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {        
        req.body.passwd = hash;
        db.get('users').push(req.body).write();
        
    });   
    res.redirect('/users');       
};
module.exports.update = function(req, res) {    
    db.get('users').find({ id: req.params.id }).assign({ email: req.body.email }).write();
    db.get('users').find({ id: req.params.id }).assign({ passwd: req.body.passwd }).write();    
    res.redirect('/users');
};