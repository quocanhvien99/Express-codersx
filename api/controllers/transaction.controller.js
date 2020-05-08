var Transaction = require('../../models/transaction.model');
var Book = require('../../models/book.model');
var User = require('../../models/user.model');

module.exports.get = async function(req, res) {
    var userid = req.user.userId;
    var user = await User.findById(userid);
    if (user.isAdmin) {      
        var userTransactions = await Transaction.find();
    } else {
        var userTransactions = await Transaction.find({ userId: userid }) ? await Transaction.find({ userId: userid }) : '[]';
    } 
    res.status(200).json(userTransactions);
}

module.exports.create = async function(req, res) {    
    req.body.isComplete = false;
    Transaction.create(req.body).then(success => res.status(200).send('Success'))
                                .catch(err => res.status(400).send('Failed'));;
    
};

module.exports.complete = async function(req, res) {  
    var transaction = await Transaction.findById(req.body.id);
    if (!transaction) {
        res.status(404).send('ID doesn`t exist');
    } else {   
        await Transaction.findByIdAndUpdate(req.body.id, { isComplete: true });
        res.status(200).send('Success');
    }    
};