const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//make server
var server;
var port = 5000;

//page listener (router file)

var router = require("./router.js");
router(app);

//service listener (services.js)
var services = require("./services.js");
services(app);
//start web server
server = app.listen(port, function (err) {
  if (err) throw err;

  console.log("listening on port: " + port);
});
