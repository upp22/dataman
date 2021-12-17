const mongoose = require("mongoose");
const clients = new mongoose.Schema({
   socketId: String,
   user: String,
   location: { lat: 0, lng: 0}
});

module.exports = mongoose.model("Clients", clients);