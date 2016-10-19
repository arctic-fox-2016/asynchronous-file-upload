//create new express router
var express = require('express')
var router = express.Router()
var fileUpload = require('express-fileupload');
var listingsController = require('../controllers/listing')
var path = require('path');
//export router

router.post('/listings', listingsController.insert)
router.get('/listings', listingsController.displays)
router.get('/listings/:id', listingsController.displayOne)
router.put('/listings/:id', listingsController.update)
router.delete('/listings/:id', listingsController.deleteitem)
router.delete('/listings/:id', listingsController.deleteitem)
router.get('/search/:query', listingsController.searchHouse)

router.post('/upload', function(req, res) {
  var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    sampleFile.mv(path.join(__dirname, '../publicimg/'+sampleFile.name), function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});


module.exports = router
