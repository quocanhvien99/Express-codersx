var shortid = require('shortid');
<<<<<<< HEAD
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
    if (!req.signedCookies['session-id']) {
        var sessionId = shortid.generate();
        await Session.create({ id: sessionId });
=======
var db = require('../db');
module.exports = function(req, res, next) {
    if (!req.signedCookies['session-id']) {
        var sessionId = shortid.generate();
        db.get('sessions').push({
            id: sessionId
        }).write();
>>>>>>> b07cddc076579264504151fc9f6cef1062128eb6
        res.cookie('session-id', sessionId, {
            signed: true
        });
        res.redirect('/');
        return;
    }
    next();
};