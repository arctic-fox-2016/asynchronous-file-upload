var Answers = require('../models/answers')
var Users = require('../models/users')
var Contents = require('../models/contents')
module.exports = {
  post: insert
}

function insert(req,res,next){
    var username=req.params.username
    var contentId=req.params.contentId
    var items = new Answers({
      username:req.params.username,
      contentId:req.params.contentId,
      content:req.body.content
    })
    items.save()
    console.log('cotentId : '+contentId);
    Contents.find({_id:contentId},(err,result)=>{
        Answers.find({contentId:contentId},(err,result2)=>{
            res.render('detail',{content:result,username:username,answer:result2})
        })
    })
    //res.json(items)
}

function getDetail(req,res,next){
    var id=req.params.id,
    username = req.params.username
    Contents.findOne({
      _id:id
    },(err,result) => {
          res.render('detail',{content:result,username:username})
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
