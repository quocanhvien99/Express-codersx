
var pagination = require('./pagination.controller');
var Transaction = require('../models/transaction.model');
var Book = require('../models/book.model');
var User = require('../models/user.model');

module.exports.index = async function(req, res) {
    var userid = req.signedCookies['user-id'];
    var user = await User.findById(userid);
    if (user.isAdmin) {      
        var userTransactions = await Transaction.find();
    } else {
        var userTransactions = await Transaction.find({ userId: userid }) ? await Transaction.find({ userId: userid }) : '';
    }    
    var page =  parseInt(req.query.page) || 1;
    var totalPages = Math.ceil(await Transaction.estimatedDocumentCount() / 5);

    var previous = page > 0 ? page - 1 : null;
    var next = page < totalPages ? page + 1 : null;  
    res.render('transactions', {
        transactions: pagination.content(userTransactions, page),
        pages: pagination.nav(page, totalPages),
        previous: previous,
        next: next
    });

};
module.exports.create = async function(req, res) {
    res.render('transaction-create', {
        books: await Book.find(),
        users: await User.find()
    });
};
module.exports.postCreate = async function(req, res) {    
    req.body.isComplete = false;
    await Transaction.create(req.body);
    res.redirect('/transactions');
};
module.exports.complete = async function(req, res) {  
    var id = await Transaction.findById(req.params.id);
    if (!id) {
        res.render('transactions', {
            error: 'Id không tồn tại.',
            transactions: Transaction.find()
        });
    } else {   
        await Transaction.findByIdAndUpdate(req.params.id, { isComplete: true });
        res.redirect('/transactions');
    }    
};