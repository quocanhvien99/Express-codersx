var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('books', {
        books: db.get('books').value()
    });
};
module.exports.delete = function(req, res) {
    db.get('books').remove({id: req.params.id}).write();
    res.redirect('back');
};
module.exports.edit = function(req, res) {
    res.render('edit', {
        id: req.params.id
    });
};
module.exports.add = function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('back');
};
module.exports.update = function(req, res) {
    db.get('books').find({ id: req.params.id }).assign({ title: req.body.title }).write();    
    res.redirect('/books');
};