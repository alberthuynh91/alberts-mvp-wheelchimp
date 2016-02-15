var linksController = require('../links/linkController.js');
var userController = require('../users/userController.js');
var listingsController = require('../listings/listingController.js');
var helpers = require('./helpers.js'); // our custom middleware
var jwt = require('jwt-simple');

module.exports = function (app, express) {
  app.get('/:code', linksController.navToLink);

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  // authentication middleware used to decode token and made available 
  //  on the request
  // app.use('/api/links', helpers.decode);
  app.get('/api/links/', linksController.allLinks);
  app.post('/api/links/', linksController.newLink);

  app.get('/api/listings/', listingsController.allListings);
  app.post('/api/listings/', listingsController.newListing);
  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

