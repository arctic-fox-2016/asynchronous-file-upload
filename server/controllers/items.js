// username:String,
// tweet:String,
// dtCreated:Date

var Items = require('../models/items')

module.exports = {
  insert: insert,
  display: display,
  update:update,
  hapus:hapus,
  detail:detail,
  deleteAll:deleteAll
}

function insert(req,res,next){
    var items = new Items({
      nama:req.body.nama,
      harga:req.body.harga
    })
    items.save()
    res.json(items)
}

function update(req,res,next){
  Items.findOne({
    _id:req.params.id
  },(err,items) => {
      items.nama = req.body.nama
      items.harga = req.body.harga

      items.save((err)=> {
        if(err) throw err
        res.json(items)
      })
  })
}

function hapus(req,res,next){
  Items.findOne({
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
  Items.remove({},(err,items) => {
      if(err)throw err
        res.json(items)
  })
}

function display(req,res,next){
    Items.find({},(err,result) => {
          res.json(result)
    }).sort( { dtCreated: 1 } )
}

function detail(req,res,next){
    Items.findOne({
      _id:req.params.id
    },(err,result) => {
          res.json(result)
    })
}
