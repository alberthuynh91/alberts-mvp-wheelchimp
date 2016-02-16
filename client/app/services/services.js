angular.module('wheelchimp.services', [])

.factory('Listings', function ($http) {
  var getListings = function () {
    return $http({
      method: 'GET',
      url: '/api/listings/'
    })
    .then(function (resp) {
      console.log('in the getlisting servers api call');
      return resp.data;
    });
  };

  var postListing = function (listing) {
    return $http({
      method: 'POST',
      url: '/api/listings/',
      data: listing
    })
    .then(function (resp) {
      console.log('postListing service function executed: ', resp);
      return resp;
    });
  };

  var deleteListing = function (listing) {
    return $http({
      method: 'DELETE',
      url: '/api/listings/',
      data: { listing: listing }
    })
    .then(function (resp) {
      return resp;
    });
  };

  var uploadImage = function(image) {
    return $http({
      method: 'POST',
      url: '/upload/image',
      data: image
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getListings: getListings,
    postListing: postListing,
    deleteListing: deleteListing,
    uploadImage: uploadImage
  };
})
.factory('Links', function ($http) {
  // Your code here
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/links/'
    })
    // consume the promise and return the data returned from the promise
    .then(function (resp) {
      return resp.data;
    });
  };

  var addOne = function (link) {
    return $http({
      method: 'POST',
      url: '/api/links/',
      data: {url : link}
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getAll: getAll,
    addOne: addOne
  };

})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      // console.log('this is the sign in token', resp.data.token);
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
