angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, Links) {
  // Your code here
  $scope.data = {};

  var initializeLinks = function () {
    Links.getAll($scope.link)
      .then(function (data) {
        $scope.data.links = data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $scope.reload = function() {
    Links.getAll($scope.link)
      .then(function (data) {
        $scope.data.links = data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  initializeLinks();
});
