const express = require('express');
const logger = require('morgan');
const app = express();
const db = require("./database/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/sessions');
const bodyParser = require("body-parser");

// middleware
app.use(logger('dev'));
app.use(cors({
    origin: process.env.REACT_URL,
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser(process.env.EXPRESS_SESSION_SECRET_KEY))
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use((req, res, next) => {
    req.passport = passport;
    return next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);

app.listen(3030, () => {
    console.log(`App listening at http://localhost:3030`);
});
