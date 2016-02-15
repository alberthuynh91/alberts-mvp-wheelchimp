angular.module('wheelchimp.shorten', [])

.controller('ShortenController', function ($scope, $timeout, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function (data) {
    $scope.loading = true;
    Links.addOne(data)
      .then(function () {
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.messageTime = function (message) {
    $timeout(function () {
      $scope.submitted = '';
    }, 2000);
  };
});
