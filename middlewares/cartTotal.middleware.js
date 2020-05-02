var db = require('../db');

module.exports = function(req, res, next) {   
    var cart =  db.get('sessions').find({ id: req.signedCookies['session-id'] }).value().cart;
    var count = 0;
    if (cart) {
        for (var x in cart) {
            count += cart[x];        
        }
    }
    res.locals.cartTotal = count;
    next();
};