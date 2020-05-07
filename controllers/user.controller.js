var bcrypt = require('bcrypt');
<<<<<<< HEAD
var pagination = require('./pagination.controller');
var User = require('../models/user.model');

module.exports.index = async function(req, res) {
    var page =  parseInt(req.query.page) || 1;
    var totalPages = Math.ceil(await User.estimatedDocumentCount() / 5);
    var previous = page > 0 ? page - 1 : null;
    var next = page < totalPages ? page + 1 : null;     
    res.render('users', {
        users: pagination.content(await User.find(), page),
=======
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
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
        pages: pagination.nav(page, totalPages),
        previous: previous,
        next: next
    });
};
module.exports.delete = async function(req, res) {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('back');
};
module.exports.edit = function(req, res) {
    res.render('user-edit', {
        id: req.params.id
    });
   };
<<<<<<< HEAD
module.exports.add = async function(req, res) {    
    const saltRounds = 10;
    const myPlaintextPassword = req.body.passwd;     
    var hash = await bcrypt.hash(myPlaintextPassword, saltRounds);  
    console.log(hash);
    req.body.passwd = hash;
    User.create(req.body);
=======
module.exports.add = function(req, res) {    
    const saltRounds = 10;
    const myPlaintextPassword = req.body.passwd; 
    req.body.id = shortid.generate();
    bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {        
        req.body.passwd = hash;
        db.get('users').push(req.body).write();
        
    });   
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    res.redirect('/users');       
};
module.exports.update = async function(req, res) {
    await User.findByIdAndUpdate(req.params.id, { email: req.body.email });    
    await User.findByIdAndUpdate(req.params.id, { passwd: req.body.passwd });   
    res.redirect('/users');
};