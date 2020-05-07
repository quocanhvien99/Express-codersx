var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
    var session = await Session.findOne({ id: req.signedCookies['session-id'] });    
    var count = 0;
    if (session.cart) {
        for (var x of session.cart) {
            count += x.amount;        
        }
    }
    res.locals.cartTotal = count;
    next();
};