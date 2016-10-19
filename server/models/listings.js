// app/models/user.js
// load the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// define the schema for our user model
var listingSchema = mongoose.Schema({
    title: String,
    owner: String,
    address: String,
    bedroom: Number,
    bathroom: Number,
    harga: Number,
    gallery: String,
    gmaps: [{
        long: String,
        lat: String
    }]

}, {
    timestamps: true
});


// create the model for users and expose it to our app
module.exports = mongoose.model('listings', listingSchema); // nama collection
