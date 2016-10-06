var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});
router.get('/upload', function(req, res, next) {
  res.render('upload')
});
router.use(fileUpload());

module.exports = router;

router.post('/upload', function(req, res) {
  var item_image;

 if (!req.files) {
     res.send('No files were uploaded.');
     return;
 }

 item_image = req.files.files
 var realpath = path.join(__dirname,'../public/uploads/')+item_image['name']
 console.log(item_image);
 item_image.mv(realpath, function(err) {
     if (err) {
         res.status(500).send(err);
     }
     else {
       var respon = {"files": [
  {
    "name": req.headers.host+'/uploads/'+item_image['name'],
    "size": 902604,
    "url": "http:\/\/example.org\/files\/picture1.jpg",
    "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture1.jpg",
    "deleteUrl": "http:\/\/example.org\/files\/picture1.jpg",
    "deleteType": "DELETE"
  },
  {
    "name": "picture2.jpg",
    "size": 841946,
    "url": "http:\/\/example.org\/files\/picture2.jpg",
    "thumbnailUrl": "http:\/\/example.org\/files\/thumbnail\/picture2.jpg",
    "deleteUrl": "http:\/\/example.org\/files\/picture2.jpg",
    "deleteType": "DELETE"
  }
]}
         res.send({'success':true, 'message':'photo berhasil diupload'});
     }
 });
});

// Show files
router.get('/uploads/fullsize/:file', function (req, res){
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});
