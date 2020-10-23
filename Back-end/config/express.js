const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

module.exports = app => {
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(cors({
        // origin: 'http://localhost:5500',
        // credentials: true
      }))
    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
        if (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        } else {
            next();
        }
    })
};