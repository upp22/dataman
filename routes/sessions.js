const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema.js');
const bcrypt = require('bcryptjs');
const passport = require("passport");

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});

router.post('/register', async function(req, res, next) {

    const doc = await User.findOne({email: req.body.email}).exec();

       if (doc) { res.send('User Exists') }
        if (!doc) {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
               username: req.body.username,
                email: req.body.email,
                password: hash
            });
            await newUser.save();
            res.send("User Created");
        }
});

router.get('/user',function(req, res, next) {
    // console.log(req.user ? req.user : "No user logged in");
    res.send(req.user);
});

router.get('/logout',function(req, res, next) {
    // console.log(req);
    req.logout();
    res.send('Logout');
});


module.exports = router;
