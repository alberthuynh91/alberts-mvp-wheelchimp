angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function (data) {
    console.log("What the fuck is scope in addlink: ", $scope);
    console.log("what is the data passed in to addlink: ", data);
    Links.addOne(data);
    //   .then(function (data) {
    //     // add link to database
    //     $window.localStorage.setItem('com.shortly', data);
    //     $location.path('/links');
    //   })
    //   .catch(function (error) {
    //     console.log('err in the addOne function: ', error);
    // });
  };

});
