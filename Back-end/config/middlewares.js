const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../util/jwt-secret');


module.exports = {
    authenticateToken: (req, res, next) => {
        const token = req.headers['token'];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();

        });
    },
    setUser: (req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    }
}