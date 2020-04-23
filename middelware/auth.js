const   jwt = require('jsonwebtoken');

module.exports = function  (req, res, next) {
    const   token = req.header('x-auth-token');

    if (!token) 
    {
        res.status(401);
        res.send("No token provided")
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.id = decoded.id;;
            next();
        } catch (ex) {
            res.status(401);
            res.send('Invalid token.');
        }
    }

}