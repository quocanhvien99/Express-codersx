var cloudinary = require('cloudinary');
var Book = require('../models/book.model');

module.exports.index = async function(req, res) {
    var books = await Book.find();    
    res.render('books/index', {        
        books: books
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
module.exports.add = async function(req, res) {
    var coverUrl = await cloudinary.v2.uploader.upload(req.file.path);   
    req.body.coverUrl = coverUrl.url;
    await Book.create(req.body);    
    res.redirect('back');
};
module.exports.update = async function(req, res) {
    await Book.findByIdAndUpdate(req.params.id, { title: req.body.title });    
    res.redirect('/books/manage');
};