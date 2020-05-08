var bcrypt = require('bcrypt');
var User = require('../../models/user.model');
 
module.exports = async function(req, res) {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.passwd;     
    var hash = await bcrypt.hash(myPlaintextPassword, saltRounds);  
    console.log(hash);
    req.body.passwd = hash;
    User.create(req.body).then(success => res.status(200).send('Successful to create new user'))
                         .catch(err => res.status(400).send('Failed to create new user'));
}
