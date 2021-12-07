const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
// initialise the variable db:
let db;

if (process.env.NODE_ENV == 'dev') {
    db = new pg.Pool({
        connectionString: process.env.POSTGRESURL
    })
} else {
    db = new pg.Pool({
        connectionString: process.env.POSTGRESURL,
        ssl: {
            rejectUnauthorized: false
        },
    })
}



module.exports = db;