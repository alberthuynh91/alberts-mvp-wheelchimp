var Listing = require('./listingModel.js');
    Q = require('q');
    util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
// var findLink = Q.nbind(Link.findOne, Link);
// var createLink = Q.nbind(Link.create, Link);

var findListing = Q.nbind(Listing.findOne, Listing);
var createListing = Q.nbind(Listing.create, Listing);
var findAllListings = Q.nbind(Listing.find, Listing);

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

  // This function is executed when postListing service is called
  newListing: function (req, res, next) {

    console.log('in newlising request body is: ', req.body);
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


    var newListing = {
      title: title,
      description: description,
      price: price,
      frontdiameter: frontdiameter,
      reardiameter: reardiameter,
      frontoffset: frontoffset,
      rearoffset: rearoffset,
      frontwidth: frontwidth,
      rearwidth: rearwidth,
      boltpattern: boltpattern
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
