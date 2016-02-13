angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $window, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function (data) {
    Links.addOne($scope.link)
      .then(function (data) {
        // add link to database
        $window.localStorage.setItem('com.shortly', data);
        $location.path('/links');
      })
      .catch(function (error) {
        console.log('err in the addOne function: ', error);
    });
  };

});
