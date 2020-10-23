const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./jwt-secret');

module.exports = {
    generateToken: (username) => {
        return jwt.sign(username, JWT_SECRET);
    }
}