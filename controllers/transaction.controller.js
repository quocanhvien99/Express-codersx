var db = require('../db');
var shortid = require('shortid');
var pagination = require('./pagination.controller');

module.exports.index = function(req, res) {
    var userid = req.signedCookies['user-id'];
    var user = db.get('users').find({ id: userid }).value();    
    if (user.isAdmin) {
        var userTransactions = db.get('transactions').value();        
    } else {
        var userTransactions = db.get('transactions').find({ userId: userid }).value() ? db.get('transactions').filter({ userId: userid }).value() : '';
    }    
    var page =  parseInt(req.query.page) || 1;
    var totalPages = Math.ceil(db.get('transactions').size().value() / 5);
    var previous = page > 0 ? page - 1 : null;
    var next = page < totalPages ? page + 1 : null;  
    res.render('transactions', {
        transactions: pagination.content(userTransactions, page),
        pages: pagination.nav(page, totalPages),
        previous: previous,
        next: next
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