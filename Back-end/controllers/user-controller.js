const encryption = require('../util/encryption');
const { generateToken } = require('../util/jwt');
const User = require('mongoose').model('User');

module.exports = {
    register: async(req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                hashedPass,
                salt,
                roles: []
            });
            req.logIn(user, (err) => {
                if (err) {
                    res.status(401);
                    res.json({ message: err.message });
                    res.end();
                } else {
                    const jwt = generateToken(user.username);
                    res.status(200);
                    res.json({ user, jwt, message: 'Registration Successful!' });
                    res.end();
                }
            });
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    login: async(req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                res.status(401);
                res.json({ message: 'Invalid user data' });
                res.end();
            }
            if (!user.authenticate(reqUser.password)) {
                res.status(401);
                res.json({ message: 'Invalid user data' });
                res.end();
            }
            req.logIn(user, (err) => {
                if (err) {
                    res.status(401);
                    res.json({ message: err.message });
                } else {
                    const jwt = generateToken(user.username);
                    res.status(200);
                    res.json({ user, jwt, message: 'Login Successful!' })
                }
            });
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    }
};