var Listing = require('./listingModel.js');
    Q = require('q');
    util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findListing = Q.nbind(Listing.findOne, Listing);
var createListing = Q.nbind(Listing.create, Listing);
var findAllListings = Q.nbind(Listing.find, Listing);
var removeListing = Q.nbind(Listing.remove, Listing);

// These functions get called from the routes.js file
// Example:
//  In routes.js, there is a listener waiting for a POST request 
//  on the /api/listings/ url, if this route is accessed then the function
//  in this server controller file 'listingsController.newListing' is called
//
// The functions are meant to handled
module.exports = {

  allListings: function (req, res, next) {
    findAllListings({})
      .then(function (listings) {
        console.log('running allListings in the listingController server side');
        res.json(listings);
      })
      .fail(function (error) {
        next(error);
      });
  },

  removeListing: function (req, res, next) {
    console.log('========in removelisting call');

    var body = '';

    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function () {
      var listingProperties = JSON.parse(body);
      console.log(listingProperties['_id']);
      var query = {
        _id: listingProperties['_id']
      };

      console.log('the query: ', query);

      Listing.remove(query, function(err, result) {
          if(err) { throw err; }
          res.end("<p>Product removed");
        });
    });
  },

  // This function is executed when postListing service is called
  newListing: function (req, res, next) {

    console.log('newListing function in server controller executed, with req.body: ', req.body);
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var frontdiameter = req.body.frontdiameter;
    var reardiameter = req.body.reardiameter;
    var frontoffset = req.body.frontoffset;
    var rearoffset = req.body.rearoffset;
    var frontwidth = req.body.frontwidth;
    var rearwidth = req.body.rearwidth;
    var boltpattern = req.body.boltpattern;
    var img = '/img/uploads/default.jpg'

    var newListing = {
      title: title,
      description: description,
      price: price,
      wheel_specs: {
        frontdiameter: frontdiameter,
        reardiameter: reardiameter,
        frontoffset: frontoffset,
        rearoffset: rearoffset,
        frontwidth: frontwidth,
        rearwidth: rearwidth,
        boltpattern: boltpattern,
        img: img
      }
    }

    res.json(createListing(newListing));
  },

  navToListing: function (req, res, next) {
    console.log('in navtoListing fn, checking req params: ', req.params.code);
    findListing({code: req.params.code})
      .then(function (listing) {
        if (!listing) {
          console.log('no listing, in the navToListing function in listingcontroller.js');
          console.log(req.body);
          return next(new Error('Link not added yet'));
        }

        listing.visits++;
        listing.save(function (err, savedListing) {
          if (err) {
            next(err);
          } else {
            res.redirect(savedListing.url);
          }
        });
      })
      .fail(function (error) {
        next(error);
      });
  }

};
