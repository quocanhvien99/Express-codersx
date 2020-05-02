var db = require('../db');
var shortid = require('shortid');
var cloudinary = require('cloudinary');

module.exports.index = function(req, res) {
    res.render('books/index', {
        books: db.get('books').value()
    });
};
module.exports.manage = function(req, res) {
    res.render('books/manage', {
        books: db.get('books').value()
    });
};
module.exports.delete = function(req, res) {
    db.get('books').remove({id: req.params.id}).write();
    res.redirect('back');
};
module.exports.edit = function(req, res) {
    res.render('books/edit', {
        id: req.params.id
    });
};
module.exports.add = function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {        
        req.body.coverUrl = result.url;
        req.body.id = shortid.generate();
        db.get('books').push(req.body).write();
        res.redirect('back');
    });   
};
module.exports.update = function(req, res) {
    db.get('books').find({ id: req.params.id }).assign({ title: req.body.title }).write();    
    res.redirect('/books/manage');
};