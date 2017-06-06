//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//others
const mongodb_url = "mongodb://localhost/test/Cars";

var db = mongoose.connect(mongodb_url);

//app configs
var app = express();
app.use(bodyParser.json());
//get models
var Cars = require('./models/Cars.js');

//listen
app.listen(8081, function () {
    console.log("API is listen on 8081!")
});

// routes
app.get('/', function (req, res) {
    res.send("Please use /api/*")
    res.end();
});

app.get("/api/cars", function (req, res) {
   Cars.getCars(function (err, cars) {
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log("/api/cars");
        res.json(cars);
   });
});
app.get("/api/cars/:id_", function (req, res) {
    Cars.getCarById(req.params.id_, function (err, cars) {
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log("/api/cars/:id");
        res.json(cars);
    });
});

app.post("/api/addCar", function (req, res) {
    var Car = req.body;
    console.log(req.body);
    Cars.addCar(Car, function (err, Car) {
        if(err){
            throw err;
        }
        console.log("/api/addCar");
        res.json(Car);
    });
});

app.put("/api/updateCar/:id_", function (req, res) {
    var Car = req.body;
    var id_ = req.params.id_;
    console.log(req.body);
    Cars.updateCar(id_, Car, {}, function (err, Car) {
        if(err){
            throw err;
        }
        console.log("/api/updateCar");
        res.json(Car);
    });
});

app.delete("/api/deleteCar/:id_", function (req, res) {

    var id_ = req.params.id_;
    console.log(req.body);
    Cars.deleteCar(id_, function (err, Car) {
        if(err){
            throw err;
        }
        console.log("/api/deleteCar");
        res.json(Car);
    });
});
