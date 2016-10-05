let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let Models = require('../models/shopping.js')
let http = require('http')
let multer = require('multer')
let storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'uploads/')
  },
  filename: function(req, file,cb){
    cb(null, file.originalname)
}})

let upload = multer({storage:storage})

router.use(bodyParser())
//client
router.get('/register', function(req, res, next) {
  http.get({
    host: "localhost",
    port: "3000",
    path: "/api/display/customer"
  }, function(response){
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSONCustomers = JSON.parse(hasil)
      res.render('register.ejs', {customers: hasilJSONCustomers})
    })
  })
})

//client
router.get('/display', function(req, res, next) {
  http.get({
    host: "localhost",
    port: "3000",
    path: "/api/display/customer"
  }, function(response) {
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSONCustomers = JSON.parse(hasil)
      http.get({
        host: "localhost",
        port: "3000",
        path: "/api/display/item"
      }, function(response) {
        hasil = ""
        response.on('data', function(d) {
          hasil += d
        });
        response.on('end', function() {
          let hasilJSONItems = JSON.parse(hasil)
          http.get({
            host: "localhost",
            port: "3000",
            path: "/api/display/cart"
          }, function(response) {
            hasil = ""
            response.on('data', function(d) {
              hasil += d
            });
            response.on('end', function() {
              let hasilJSONCarts = JSON.parse(hasil)
              res.render('display.ejs', { customers: hasilJSONCustomers, items: hasilJSONItems, carts:hasilJSONCarts })
            });
          })
        });
      })
    });
  })
})

//SERVER

router.post('/customers/edit/:id', function(req, res, next) {
  http.get({
    host: "localhost",
    port: "3000",
    path: `/api/customers/edit/${req.params.id}`,
  }, function(response) {
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSON = JSON.parse(hasil)
      res.render('edit-customer.ejs', { customer: hasilJSON })
    });
  })
})

router.post('/items/edit/:id', function(req, res, next) {
  http.get({
    host: "localhost",
    port: "3000",
    path: `/api/items/edit/${req.params.id}`,
  }, function(response) {
    let hasil = ""
    response.on('data', function(d) {
      hasil += d
    });
    response.on('end', function() {
      let hasilJSON = JSON.parse(hasil)
      res.render('edit-item.ejs', { item: hasilJSON })
    });
  })
})

//SERVER
router.post('/api/register/customer', function(req, res, next) {
  console.log("masuk api")
  console.log(req.body.member_id)
  let newCustomer = new Models.Customers({ "member_id": req.body.member_id, "name": req.body.name, "address": req.body.address, "zipcode": req.body.zipcode, "phone": req.body.phone }).save(function(err, result) {
    if (err) {
      console.log(err)
    }
    res.redirect('/register')
  })
})

router.post('/api/register/item', function(req, res, next) {
  let newItem = new Models.Items({ "item_code": req.body.item_code, "name": req.body.name, "description": req.body.description, "price": req.body.price, "stock": req.body.stock }).save(function(err, result) {
    if (err) {
      console.log(err)
    }
    res.redirect('/register')
  })
})

router.post('/api/register/cart', function(req, res, next){
  Models.Customers.findOne({member_id: req.body.member_id}, function(err,result1){
    let newCart = new Models.Carts({member: result1._id, transaction_date: req.body.transaction_date}).save(function(err, result2){
      if(err){
        console.log(err)
      } else {
        for (let j in req.body.item_code){
          Models.Items.findOne({item_code: req.body.item_code[j]}, function(err, result3){
            Models.Carts.update({ _id: result2._id}, { $push: {itemList:{"item_detail": result3._id, "qty": req.body.qty[j]}}}, function(err,result4){
              if(err){
                console.log(err)
              }
              console.log(result4)
            })
          })
        }
      }
      res.redirect('/register')
    })
  })
})


router.get('/api/display/customer', function(req, res, next) {
  Models.Customers.find({}, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

router.get('/api/display/item', function(req, res, next) {
  Models.Items.find({}, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

router.get('/api/display/cart', function(req, res, next) {
  Models.Carts.find({}).populate('itemList.item_detail').populate('member').exec(function(err,result){
    if(err){
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

router.post('/api/customers/delete/:id', function(req, res, next) {
  Models.Customers.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/display")
    }
  })
})

router.get('/api/customers/edit/:id', function(req, res, next) {
  Models.Customers.findOne({ _id: req.params.id }, function(err, result) {
    res.json(result)
  })
})

router.post('/api/customers/edit/success/:id', function(req, res, next) {
  Models.Customers.update({ _id: req.params.id }, {member_id: req.body.member_id, name: req.body.name, address: req.body.address, zipcode: req.body.zipcode, phone: req.body.phone}, function(err){
    res.redirect("/display")
  })
})

router.post('/api/items/delete/:id', function(req, res, next) {
  Models.Items.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/display")
    }
  })
})

router.get('/api/items/edit/:id', function(req, res, next) {
  Models.Items.findOne({ _id: req.params.id }, function(err, result) {
    res.json(result)
  })
})

router.post('/api/items/edit/success/:id', function(req, res, next) {
  Models.Items.update({ _id: req.params.id }, {item_code: req.body.item_code, name: req.body.name, description: req.body.description, price: req.body.price, stock: req.body.stock}, function(err){
    res.redirect("/display")
  })
})

router.get('/upload', function(req,res,next){
  res.render('upload.ejs')
})

router.post('/upload', upload.single('file'), function(req,res,next){
  res.send('sukses')
})

module.exports = router
