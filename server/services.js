const fs = require("fs");
const path = require("path");
const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
  app.post("/write-record", function (req, res) {
    var shoeId = "shoe" + Date.now();

    var shoeData = {
      shoe_name: req.body.shoe_name,
      year_released: req.body.year_released,
      shoe_type: req.body.shoe_type,
      brand: req.body.brand,
      price: req.body.price,
      color: req.body.color,
      id: shoeId
    };

    var closetData = [];

    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          closetData = JSON.parse(data);
          closetData.push(shoeData);
          
          

          fs.writeFile(DATABASE_FILE, JSON.stringify(closetData), function (err) {
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
      fs.writeFile(DATABASE_FILE, JSON.stringify(closetData), function (err) {
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

  app.delete("/delete-records", function(req, res) {
    var recordIdToDel = req.body.id;
    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          closetData = JSON.parse(data);
          var newClosetDataArray = closetData.filter(shoeData => shoeData.id !== recordIdToDel);
          
          

          fs.writeFile(DATABASE_FILE, JSON.stringify(newClosetDataArray), function (err) {
            if (err) {
              res.send(JSON.stringify({ msg: err }));
            } else {
              res.send(JSON.stringify({ msg: "SUCCESS - the shoe with " + recordIdToDel + "was deleted" }));
              
            }
          });
        }
      });
    } else {
      
      fs.writeFile(DATABASE_FILE, JSON.stringify(closetData), function (err) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          res.send(JSON.stringify({ msg: "SUCCESS" }));
        }
      });
    }
  })
};

module.exports = services;
