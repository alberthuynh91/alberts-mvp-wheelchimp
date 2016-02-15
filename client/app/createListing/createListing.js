angular.module('wheelchimp.createListings', [])

.controller('CreateListingsController', function ($scope, $location, Listings) {

  $scope.createListing = {};
  $scope.listingObject = {};

  $scope.submitListing = function (listing) {

    $scope.loading = true;

    $scope.listingObject = { 
      title: $scope.listingTitle, 
      description: $scope.listingDescription,
      price: $scope.listingPrice,
      frontdiameter: $scope.frontDiameter,
      reardiameter: $scope.rearDiameter,
      frontoffset: $scope.frontOffset,
      rearoffset: $scope.rearOffset,
      frontwidth: $scope.frontWidth,
      rearwidth: $scope.rearWidth,
      boltpattern: $scope.boltPattern
    };

    Listings.postListing($scope.listingObject)
      .then(function () {
        console.log('submit listing function executed, the object is: ', $scope.listingObject);
        $scope.loading = false;
      })
      .catch(function (error) {
        console.log('There was an error submitting the listing: ', error);
      });
  };
});
