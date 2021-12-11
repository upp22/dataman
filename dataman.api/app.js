const mongoose = require("mongoose");
const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

// SocketIo
const { createServer } = require("http");
const server = createServer(app)
const socketIo = require("socket.io");
const io = socketIo(server, { cors: { origin: "*" } });


// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/sessions');
const bodyParser = require("body-parser");

//----------------------------------------- END OF IMPORTS---------------------------------------------------
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);

io.sockets.on('connection', (socket) => {
    console.log(`Socket client connected: ${socket.id}`);
    socket.on('clientLocationUpdate',function (data) {
        // TODO: Get Id and socket ID of clients (match these to user names) then broadcast to all connected clients
        console.log(`Client Location Update: ${data}`)
    });
})



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
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

// pass socket io instance via middleware
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);

// app.listen(3030, () => {
//     console.log(`App listening at http://localhost:3030`);
// });

// Start the web server
server.listen(3030, () => {
    console.log(`listening on port http://localhost:3030`);
});