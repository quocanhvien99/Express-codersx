var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
    res.render('transactions', {
        transactions: db.get('transactions').value()
    });
};
module.exports.create = function(req, res) {
    res.render('transaction-create', {
        books: db.get('books').value(),
        users: db.get('users').value()
    });
};
module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions');
};
module.exports.complete = function(req, res) {

    if (!db.get('transactions').find({ id: req.params.id }).value()) {
        res.render('transactions', {
            error: 'User id không tồn tại.',
            transactions: db.get('transactions').value()
        });
    } else {        
        db.get('transactions').find({ id: req.params.id }).assign({ isComplete: true }).write();
        res.redirect('/transactions');
    }
    
};