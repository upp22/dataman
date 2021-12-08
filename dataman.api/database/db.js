const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Mongoose Connected');
    }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = mongoose;