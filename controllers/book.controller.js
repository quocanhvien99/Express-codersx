<<<<<<< HEAD
var cloudinary = require('cloudinary');
var Book = require('../models/book.model');

module.exports.index = async function(req, res) {
    var books = await Book.find();    
    res.render('books/index', {        
        books: books
=======
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
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    });
};
module.exports.manage = async function(req, res) {
    var books = await Book.find();  
    res.render('books/manage', {
        books: books
    });
};
module.exports.delete = async function(req, res) {
    await Book.findByIdAndDelete(req.params.id);    
    res.redirect('back');
};
module.exports.edit = function(req, res) {
    res.render('books/edit', {
        id: req.params.id
    });
};
<<<<<<< HEAD
module.exports.add = async function(req, res) {
    var coverUrl = await cloudinary.v2.uploader.upload(req.file.path);   
    req.body.coverUrl = coverUrl.url;
    await Book.create(req.body);    
    res.redirect('back');
};
module.exports.update = async function(req, res) {
    await Book.findByIdAndUpdate(req.params.id, { title: req.body.title });    
=======
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
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    res.redirect('/books/manage');
};