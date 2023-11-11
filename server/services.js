const fs = require("fs");
const path = require("path");
const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
  app.post("/write-record", function (req, res) {
    var id = "shoe" + Date.now();

    var shoeData = {
      shoe_name: req.body.shoe_name,
      year_released: req.body.year_released,
      shoe_type: req.body.shoe_type,
      brand: req.body.brand,
      price: req.body.price,
      color: req.body.color,
    };

    var closetData = [];

    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          closetData = JSON.parse(data);
          closetData.push(shoeData);

          fs.writeFile(DATABASE_FILE, JSON.stringify(shoeData), function (err) {
            if (err) {
              res.send(JSON.stringify({ msg: err }));
            } else {
              res.send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      });
    } else {
      closetData.push(shoeData);
      fs.writeFile(DATABASE_FILE, JSON.stringify(shoeData), function (err) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          res.send(JSON.stringify({ msg: "SUCCESS" }));
        }
      });
    }
  });

  app.get("/get-records", function (req, res) {
    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          closetData = JSON.parse(data);
          res.send(JSON.stringify({ msg: "SUCCESS", closetData: closetData }));
        }
      });
    } else {
      var data = [];
      res.send(JSON.stringify({ msg: "SUCCESS", closetData: closetData }));
    }
  });
};

module.exports = services;
