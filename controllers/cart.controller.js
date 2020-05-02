var db = require('../db');
var shortid = require('shortid');

module.exports.addToCart = function(req, res) {
    var sessionId = req.signedCookies['session-id'];
    var bookId = req.params.bookId;

    if (!sessionId) {
        res.redirect('/books');
        return;
    }

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
    res.redirect('back');
}
