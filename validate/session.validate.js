var shortid = require('shortid');
var db = require('../db');
module.exports = function(req, res, next) {
    if (!req.signedCookies['session-id']) {
        var sessionId = shortid.generate();
        db.get('sessions').push({
            id: sessionId
        }).write();
        res.cookie('session-id', sessionId, {
            signed: true
        });
        res.redirect('/');
        return;
    }
    next();
};