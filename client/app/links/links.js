angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, $location, Links) {
  // Your code here
  $scope.data = {};

    Links.getAll($scope.link)
      .then(function(data) {
        // pull links from database and assign to scope.links
        console.log('the data in the links.js GET ALL FUNCTION: ', data);
        $scope.links = data;
      });

  $scope.addOne = function() {
    Links.addOne($scope.link)
      .then(function(data) {
        // add link to database
        $window.localStorage.setItem('com.shortly', data);
        $location.path('/links');
      })
      .catch(function(error) {
        console.log('err in the addOne function: ', error);
      });
  };
});
