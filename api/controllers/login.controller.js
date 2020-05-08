var bcrypt = require('bcrypt');
var shortid = require('shortid');
var jwt = require('jsonwebtoken');
var User = require('../../models/user.model');
var Session = require('../../models/session.model');

module.exports = async function(req, res) {
    var user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(404).send('No user found');
    }

    var myPlaintextPassword = req.body.passwd;
    var hash = user.passwd;
    var compareHash = await bcrypt.compare(myPlaintextPassword, hash);
    if (compareHash) {
        var sessionId = shortid.generate();
        await Session.create({ id: sessionId });

        const token = jwt.sign({ userId: user.id, sessionId: sessionId }, process.env.JWT_SECRET);
        res.status(200).json({            
            token: token
        });
    } else {
        res.status(400).send('Invalid password');
    }

}