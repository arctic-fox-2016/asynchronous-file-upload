// title:String,
// content:String,
// type:String,
// upvote:Number,
// downvote:Number,
// answer:Number,
// parentId:String,
// userName:String

var Contents = require('../models/contents')
var Users = require('../models/users')
var Answers = require('../models/answers')
module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,

  insertPost:insertPost,
  deletePost:deletePost,
  detailPost:detailPost,
  thumbsup:thumbsup
}

function insert(req,res,next){
    var items = new Contents({
      title:req.body.title,
      content:req.body.content,
      upvote:0,
      downvote:0,
      answer:0,
      parentId:'',
      userName:''
    })
    items.save()
    res.json(items)
}

function update(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      items.title = req.body.title
      items.content = req.body.content
      items.upvote = req.body.upvote
      items.downvote = req.body.downvote
      items.answer = req.body.answer
      items.parentId = req.body.parentId
      items.userName = req.body.userName

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function display(req,res,next){
    Contents.find({},(err,result) => {
          res.json(result)
    })
}

function detail(req,res,next){
    Contents.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}



// non API
function deletePost(req,res,next){
  Contents.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        //res.json(items)
        Users.findOne({
          username:req.params.username
        },(err,items3) => {
          console.log('username: '+req.params.username);
          Contents.find({},(err,items2)=> {
              console.log('ITEMS 2');
              console.log(items2);
              console.log('ITEMS 3');
              console.log(items3);
              res.render('index',{profile:items3,content:items2});
          })
        })
      })
  })


}
function insertPost(req,res,next){
    var items = new Contents({
      title:req.body.title,
      content:req.body.content,
      upvote:0,
      downvote:0,
      answer:0,
      parentId:'',
      userName:req.body.username
    })
    items.save()
    redirectToHome(res,req.body.username)
}

function detailPost(req,res,next){
    var id=req.params.id,
    username = req.params.username
    Contents.findOne({
      _id:id
    },(err,result) => {
          Answers.find({
            contentId:id
          },(err,items3) =>{
            res.render('detail',{content:result,username:username,answer:items3})
          })

    })
}

function thumbsup(req,res,next){
  var contentId=req.params.contentId,
  username=req.params.username
    Contents.findOne({
      _id:contentId
    },(err,result) => {
          result.upvote+=1
          result.save()
          redirectToHome(res,username)
    })
}


function redirectToHome(res,username){
  Users.findOne({
    username:username
  },(err,items) => {
    Contents.find({},(err,items2)=> {
        console.log(items2);
        res.render('index',{profile:items,content:items2});
    })
  })

}
