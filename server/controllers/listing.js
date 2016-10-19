var Listings = require('../models/listings')

module.exports = {
    insert: insert,
    displays: displays,
    displayOne: displayOne,
    update: update,
    deleteitem: deleteitem,
    searchHouse:searchHouse
}

function insert(req, res, next) {

    var listings = new Listings({
        title: req.body.title,
        owner: req.body.owner,
        address: req.body.address,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        harga: req.body.harga,
        gallery: req.body.gallery
    })
    listings.gmaps.push({
        long: req.body.long,
        lat: req.body.lat
    })


    listings.save((err) => {
        if (err)
            throw err
        res.json(listings)
        console.log(listings);
    })

}

function displays(req, res) {
    Listings.find({}, (err, listings) => {
        res.json(listings)
    })
}

function displayOne(req, res) {
    Listings.findOne({
        _id: req.params.id
    }, (err, listings) => {
        //update the book
        res.json(listings)
    })
}

function update(req, res) {

    //finding a current book
    Listings.findOne({
        _id: req.params.id
    }, (err, listings) => {
        //update the book
        listings.title = req.body.title,
            listings.owner = req.body.owner,
            listings.address = req.body.address,
            listings.bedroom = req.body.bedroom,
            listings.bathroom = req.body.bathroom,
            listings.harga = req.body.harga,
            listings.gallery = req.body.gallery,
            listings.gmaps[0].long = req.body.long,
            listings.gmaps[0].lat = req.body.lat
        listings.save((err) => {
            if (err)
                throw err;
            res.json(listings)

        })
    })
}

function deleteitem(req, res) {
    Listings.remove({
        _id: req.params.id
    }, (err, listings) => {
        res.json({
            "messages": "File deleted"
        })
    })
}


function displayOne(req, res) {
    Listings.findOne({
        _id: req.params.id
    }, (err, listings) => {
        //update the book
        res.json(listings)
    })
}

function searchHouse(req, res) {
//  console.log(req.params.query);

    Listings.find({
        $or: [{
            title: {
                $regex: req.params.query+'*',
                $options: 'i'
            }
        }, {
            address: {
                $regex: req.params.query+'*',
                $options: 'i'
            }
        }, {
            owner: {
                $regex: req.params.query+'*',
                $options: 'i'
            }
        }]
    }, (err, listings) => {

      if (err)
          throw err;
        res.json(listings)
    })
}
