var shortid = require('shortid');
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
    if (!req.signedCookies['session-id']) {
        var sessionId = shortid.generate();
        await Session.create({ id: sessionId });
        res.cookie('session-id', sessionId, {
            signed: true
        });
        res.redirect('/');
        return;
    }
    next();
};