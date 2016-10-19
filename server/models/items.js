var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var itemsSchema = mongoose.Schema({
    nama:String,
    harga:Number
})

module.exports= mongoose.model('items', itemsSchema)
