var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    phone:String,
    username: String,
    passwd: String,
    avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;