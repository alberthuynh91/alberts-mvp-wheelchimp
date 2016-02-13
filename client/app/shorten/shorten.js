angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $timeout, $location, Links) {
  // Your code here
  $scope.link = {};
  $scope.messageTime = function (message) {
    $timeout(function () {
      $scope.submitted = '';
    }, 2000);
  };

  $scope.addLink = function (data) {
    Links.addOne(data);
  };

});
