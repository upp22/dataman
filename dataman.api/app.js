const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const expressSession = require("express-session"); // Express library to handle sessions
const pgSession = require("connect-pg-simple")(expressSession); // Creates a session instance for this express session
const db = require("./database/db");
app.use(logger('dev'));

// Session middleware & router
app.use(
    expressSession({
        store: new pgSession({ // "storing the session in DB rather than memory"
            pool: db, // Connects to our postgres db
            createTableIfMissing: true, // Creates a session table in your database
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY, // Access the secret key from .env

    })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3030, () => {
    console.log(`App listening at http://localhost:3030`);
});
