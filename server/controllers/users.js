// username:String,
// email:String,
// password:String

var Users = require('../models/users')

module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,

  insertUser:insertUser,
  deleteUser:deleteUser
}

function insert(req,res,next){
    var items = new Users({
      username:req.body.username,
      password:req.body.password,
      email:req.body.email
    })
    items.save()
    res.json(items)
}

function update(req,res,next){
  Users.findOne({
    _id:req.params.id
  },(err,items) => {
      items.username = req.body.username
      items.email = req.body.email
      items.password = req.body.password

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Users.findOne({
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
    Users.find({},(err,result) => {
          res.json(result)
    })
}

function detail(req,res,next){
    Users.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}



// non API
function deleteUser(req,res,next){
  Users.findOne({
    _id:req.params.id
  },(err,items) => {
      if(err)throw err

      items.remove((err)=> {
        if(err) throw err
        //res.json(items)
        res.redirect('/');
      })
  })
}
function insertUser(req,res,next){
    var items = new Users({
      username:req.body.username,
      password:req.body.password,
      email:req.body.email
    })
    items.save()
    //res.json(items)
    res.redirect('/');
}
