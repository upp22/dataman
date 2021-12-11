const mongoose = require("mongoose");
const express = require('express');
const logger = require('morgan');
const app = express();
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

//----------------------------------------- END OF IMPORTS---------------------------------------------------

const dotenv = require("dotenv");
const http = require("http");
dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose Is Connected");
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);

app.listen(3030, () => {
    console.log(`App listening at http://localhost:3030`);
});
