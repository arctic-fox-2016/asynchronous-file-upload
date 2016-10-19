var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var contentSchema = mongoose.Schema({
    title:String,
    content:String,
    type:String,
    upvote:Number,
    downvote:Number,
    answer:Number,
    parentId:String,
    userName:String

})

module.exports= mongoose.model('contents', contentSchema)
