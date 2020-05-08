var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    var token = req.headers.authorization;

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(payload) {
            req.user = payload;
            next();                        
        } else {
            // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
            return res.status(401).send('Unauthorized');            
        }
        return;

    })
}