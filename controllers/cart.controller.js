<<<<<<< HEAD
var Session = require('../models/session.model');
var Transaction = require('../models/transaction.model');

module.exports.addToCart = async function(req, res) {
=======
var db = require('../db');
var shortid = require('shortid');

module.exports.addToCart = function(req, res) {
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    var sessionId = req.signedCookies['session-id'];
    var bookId = req.params.bookId;

    if (!sessionId) {
        res.redirect('/books');
        return;
    }

<<<<<<< HEAD
    var session = await Session.findOne({ id: sessionId });
    var book = session.cart.find(function(x) {
        return x.bookId === bookId; 
    });
    if(!book) {
        session.cart.push({ bookId: bookId });        
    } else {
        for (var element of session.cart) {
            if (element.bookId === bookId) {
                element.amount += 1;
            }
        }
    }
    await session.save();

    res.redirect('back');
};
module.exports.createTransaction = async function(req, res) {
    var userId = req.signedCookies['user-id'];
    var sessionId = req.signedCookies['session-id'];
    var session = await Session.findOne({ id: sessionId });

    if (!session.cart) {
        res.redirect('back');
        return;
    }

    for (var x of session.cart) {
        await Transaction.create({
            userId: userId,
            bookId: x.bookId,
            isComplete: false
        })
    }

    while(session.cart.length > 0) {
        session.cart.pop();
    }
    await session.save();

=======
    var count = db
        .get('sessions')
        .find({ id: sessionId })
        .get('cart.' + bookId, 0)
        .value();
    
    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + bookId, count + 1)
        .write();

    res.redirect('back');
};
module.exports.createTransaction = function(req, res) {
    var userId = req.signedCookies['user-id'];
    var sessionId = req.signedCookies['session-id'];
    var cart =  db.get('sessions').find({ id: sessionId }).value().cart;
    if (!cart) {
        res.redirect('back');
        return;
    }
    for (var x in cart) {            
        for (var i = 0; i < cart[x]; i++) {
            db.get('transactions').push({
                id: shortid.generate(),
                userId: userId,
                bookId: x
            }).write();
        }       
    }
    db.get('sessions').find({ id: sessionId }).unset('cart').write();
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
    res.redirect('back');
}
