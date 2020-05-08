var Session = require('../../models/session.model');
var Transaction = require('../../models/transaction.model');

module.exports.addToCart = async function(req, res) {

    var sessionId = req.user.sessionId;
    var bookId = req.body.bookId;

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

    res.status(200).send('Success');
};
module.exports.createTransaction = async function(req, res) {
    var userId = req.user.userId;
    var sessionId = req.user.sessionId;
    var session = await Session.findOne({ id: sessionId });

    if (!session.cart) {       
        return res.status(400).send('Empty cart');
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

    res.status(200).send('Success');
}
