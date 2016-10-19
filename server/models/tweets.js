var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var tweetSchema = mongoose.Schema({
    username:String,
    tweet:String,
    dtCreated:Date,
    hashtag:String
})

module.exports= mongoose.model('tweet', tweetSchema)
