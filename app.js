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
const {createServer} = require("http");
const server = createServer(app)
const socketIo = require("socket.io");
const io = socketIo(server, {cors: {origin: "*"}});

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/sessions');
const bodyParser = require("body-parser");

// schema
const ClientCollection = require('./models/ClientsSchema');

//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Clear all connected clients in Mongo
ClientCollection.deleteMany({}).then(x => {
    console.log(`Clients collection cleared`);
})

app.use(express.static("./client/build"));

app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);

// Mongoose Functions TODO: Move to Models
const getClient = async (socketId) => {
    const doc = await ClientCollection.findOne({socketId: socketId}).exec();
    return !!doc;
};

const getAllClients = async () => {
    const doc = await ClientCollection.find({}).exec();
    return doc;
}

const addClient = async (socketId) => {
    const newClient = new ClientCollection({
        socketId: socketId,
        user: null,
        location: {lat: 0, lng: 0}
    });
    await newClient.save();
    console.log('New Client added to mongo.');
}

const deleteClient = async (socketId) => {
    await ClientCollection.deleteOne({socketId: socketId}).then(res => {
        console.log('Client Connection Deleted.')
    }).then(x => {
        broadcastLocationUpdate();
    })
}

const updateClient = async (socketId, update) => {
    const filter = {socketId: socketId};
    await ClientCollection.findOneAndUpdate(filter, update).then(x => {
        broadcastLocationUpdate();
    })
}

const broadcastLocationUpdate = async () => {
    const allClients = await getAllClients();
    const payload = allClients.map(c => {
        const { lat, lng } = c.location;
        return {
            socketId: c.socketId,
            user: c.user,
            location: { lat: lat, lng: lng }
        }
    });
    io.emit('locationUpdate', payload);
}

io.sockets.on('connection', async (socket) => {
    console.log(`Socket client connected: ${socket.id}`);

    // If socketId does not exist then add to db
    const socketExists = await getClient(socket.id)
    if (!socketExists) {
        await addClient(socket.id);
    }

    await broadcastLocationUpdate();

    // when user logs in we get their user details and add to list of ids:
    socket.on('clientLogin', async u => {
        // TODO:
        await updateClient(socket.id, {
            user: u.user
        });
    });

    // Delete socket when disconnects
    socket.on('disconnect', async s => {
        await deleteClient(socket.id);
    })

    // Remove user from socket on logout
    socket.on('logout', async s => {
        // TODO:
        await updateClient(socket.id, {
            user: null
        })
    });

    socket.on('locationUpdate', async data => {
        // TODO:
        await updateClient(socket.id, {
            location: { lat: data.lat, lng: data.lng }
        })
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
app.use(bodyParser.urlencoded({extended: true}));

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
server.listen(process.env.PORT || 3030, () => {
    console.log(`listening on port http://localhost:3030`);
});