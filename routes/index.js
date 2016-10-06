var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');
var im = require('imagemagick');

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

 var thumbPath = path.join(__dirname,'../public/uploads/thumbs/')+item_image['name']
 var realpath = path.join(__dirname,'../public/uploads/')+item_image['name']
 console.log(item_image);
 item_image.mv(realpath, function(err) {
     if (err) {
         res.status(500).send(err);
     }
     else {
       im.resize({
                 srcPath: realpath,
                 dstPath: thumbPath,
                 width:   200
               }, function(err, stdout, stderr){
                 if (err) throw err;
                 console.log('resized image to fit within 200x200px');
               });
var re = {"files": [
  {
    "name": item_image['name'],
    "size": 902604,
    "url": "http:\/\/localhost:3000\/uploads\/" + item_image['name'],
    "thumbnailUrl": "http:\/\/localhost:3000\/uploads\/thumbs\/" + item_image['name'],
    "deleteUrl": "http:\/\/localhost:3000\/photos\/"+ item_image['name'],
    "deleteType": "DELETE"
  }
]}
         //res.send({'success':true, 'message':'photo berhasil diupload'});
         res.send(re);
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

router.delete('/photos/:name',function (req,res){
  console.log('enter here');
  var photoname = req.params.name

  var thumbPath = path.join(__dirname,'../public/uploads/thumbs/')+photoname
  var realpath = path.join(__dirname,'../public/uploads/')+photoname

  fs.unlink(thumbPath);
  fs.unlink(realpath);
  console.log('file deleted');

var re = {"files": [
  {
    photoname: true
  }
]}
res.send(re);
})
