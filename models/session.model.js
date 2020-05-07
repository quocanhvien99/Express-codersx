var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    id: String,
    cart: [{
        bookId: String,
        amount: { type: Number, default: 1 }
    }]
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;