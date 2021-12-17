const express = require('express');
const router = express.Router();
const path = __dirname + 'client/build/';

/* GET home page. */
router.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});
module.exports = router;
