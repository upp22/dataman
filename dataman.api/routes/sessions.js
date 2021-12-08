const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema.js');
const bcrypt = require('bcryptjs');

router.post('/login', (req, res, next) => {
    req.passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

router.post('/register', function(req, res, next) {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) { res.send('User Exists') }
        if (!doc) {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
               username: req.body.username,
                email: req.body.email,
                password: hash
            });
            await newUser.save();
        }
    })

    console.log(req.body)
    res.json('register');
});

router.get('/user', function(req, res, next) {
    console.log(req.body)
    res.json('user get');
});

module.exports = router;