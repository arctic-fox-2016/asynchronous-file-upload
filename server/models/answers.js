var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var answerSchema = mongoose.Schema({
    username:String,
    contentId:String,
    content:String
})

module.exports= mongoose.model('answers', answerSchema)
