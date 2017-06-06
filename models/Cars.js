/**
 * Created by bbr-PC on 6/5/2017.
 */
var mongoose = require("mongoose");

var carsSchema = mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now()
    }
}); //end car schema

//export models
var Cars = module.exports = mongoose.model('Cars', carsSchema, 'Cars'); // collection name in db: 'Cars' as third argument

// accessors
module.exports.getCars = function (callback) {
    Cars.find(callback);
};

module.exports.getCarById = function (id_, callback) {

    Cars.findById(id_, callback);
};

module.exports.addCar = function (Car, callback) {

    Cars.create(Car, callback);
};

module.exports.updateCar = function (id_, Car, options, callback) {
    var query = {_id : id_};
    var update = {
        make : Car.make
    };

    Cars.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteCar = function (id_, callback) {
    var query = {_id : id_};

    Cars.remove(query,  callback);
};