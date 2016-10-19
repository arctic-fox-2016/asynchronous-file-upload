// username:String,
// tweet:String,
// dtCreated:Date

var Tweets = require('../models/tweets')

module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,
  deleteAll:deleteAll
}

function insert(req,res,next){
    var items = new Tweets({
      username:req.body.username,
      tweet:req.body.tweet,
      dtCreated:new Date(),
      hashtag:req.body.hashtag
    })
    items.save()
    res.json(items)
}

function update(req,res,next){
  Tweets.findOne({
    _id:req.params.id
  },(err,items) => {
      items.username = req.body.username
      items.tweet = req.body.tweet
      items.dtCreated = new Date()
      items.hashtag = req.body.hashtag

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Tweets.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function deleteAll(req,res,next){
  Tweets.remove({},(err,items) => {
      if(err)throw err
        res.json(items)
  })
}

function display(req,res,next){
    Tweets.find({},(err,result) => {
          res.json(result)
    }).sort( { dtCreated: 1 } )
}

function detail(req,res,next){
    Tweets.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}
