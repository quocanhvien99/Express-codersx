var Book = require('../../models/book.model');

module.exports.get = async function(req, res) {
    var books = await Book.find();    
    res.status(200).json(books);    
};

module.exports.getOne = async function(req, res) {
    var book = await Book.findById(req.params.id);    
    res.status(200).json(book);    
};