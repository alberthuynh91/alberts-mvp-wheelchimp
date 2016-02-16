angular.module('wheelchimp.createListings', [])

.controller('CreateListingsController', function ($scope, $location, Listings) {

  $scope.createListing = {};

  // Submit listing function 
  $scope.submitListing = function () {

    $scope.loading = true;

    // Create listing object to pass to postListing function
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
      boltpattern: $scope.boltPattern,
      img: '/img/uploads/default.jpg'
    };

    // Post the listing with the object created above
    Listings.postListing($scope.listingObject)
      .then(function () {
        console.log('Listing Submitted!' , $scope.listingObject);
        $scope.loading = false;
        $location.path('/listings');
      })
      .catch(function (error) {
        console.log('There was an error submitting the listing: ', error);
      });
  };

});
