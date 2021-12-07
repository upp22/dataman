const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

app.use(logger('dev'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3030, () => {
    console.log(`App listening at http://localhost:3030`);
});
