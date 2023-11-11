const path = require("path");

//page listeners
var router = function (app) {
  app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/shoe.html"));
  });

  app.get("/home", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/shoe.html"));
  });

  app.get("/write-data", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/write-data.html"));
  });

  app.get("/view-data", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/view-data.html"));
  });
};

module.exports = router;
