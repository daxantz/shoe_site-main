const fs = require("fs");
const path = require("path");
const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
var dbURL = "mongodb://localhost";

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
      id: shoeId,
    };

    var closetData = [];

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          var dbo = client.db("shoes");

          dbo.collection("shoedata").insertOne(shoeData, function (err) {
            if (err) {
              return res.status(201).send(JSON.stringify({ msg: err }));
            } else {
              return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      }
    );
  });

  app.get("/get-records", function (req, res) {
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          var dbo = client.db("shoes");

          dbo
            .collection("shoedata")
            .find()
            .toArray(function (err, data) {
              if (err) {
                return res.status(201).send(JSON.stringify({ msg: err }));
              } else {
                return res
                  .status(200)
                  .send(JSON.stringify({ msg: "SUCCESS", closetData: data }));
              }
            });
        }
      }
    );
  });

  app.delete("/delete-records", function (req, res) {
    var shoeID = req.body.id;
    var s_id = new ObjectId(shoeID);

    var search = { _id: s_id };

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          var dbo = client.db("shoes");

          dbo.collection("shoedata").deleteOne(search, function (err) {
            if (err) {
              return res.status(201).send(JSON.stringify({ msg: err }));
            } else {
              return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      }
    );
  });

  app.get("/get-shoesByType", function (req, res){
    var type = req.query.type;
    var search = type === "" ? {} : {type: type};
    console.log(search)

    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function (err, client){
      if(err) {
        return res.status(201).send(JSON.stringify({msg: err}));
      } else {
        var dbo = client.db("shoes");

        dbo.collection("shoedata").find(search).toArray(function (err, data){
          if(err) {
            return res.status(201).send(JSON.stringify({msg: err}));
          } else {
            return res.status(201).send(JSON.stringify({msg: "SUCCESS", closetData: data}));
          }
        })
      }
    })
  })


  app.put("/update-shoe", function (req, res){
    var shoeID = req.body.ID;
    var name = req.body.name;
    var releaseDate = req.body.releaseDate;
    var type = req.body.type;
    var brand = req.body.brand;
    var price = req.body.price;
    var color = req.body.color;
    var s_id = new ObjectId(shoeID);
    var search = {_id : s_id};

    var updateData = {
      $set: {
        shoe_name: name,
        year_released: releaseDate,
        shoe_type: type,
        brand: brand,
        price: price,
        color: color
      }
    }

    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
      if(err) {
        return res.status(201).send(JSON.stringify({msg: err}));
      } else {
        var dbo = client.db("shoes")

        dbo.collection("shoedata").updateOne(search, updateData, function (err){
          if(err) {
            return res.status(201).send(JSON.stringify({msg: err}));
          } else {
            return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
          }
        })
      }
    })


  })

  app.delete("/delete-shoe", function (req, res){
    var shoeID = req.query.shoeID;
    var s_id = new ObjectId(shoeID);
    var search = {_id: s_id}

    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
      if(err) {
        return res.status(201).send(JSON.stringify({msg: err}));
      } else {
        var dbo = client.db("shoes")

        dbo.collection("shoedata").deleteOne(search,function (err){
          if(err) {
            return res.status(201).send(JSON.stringify({msg: err}));
          } else {
            return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
          }
        })
      }
    })

  })
};

module.exports = services;
