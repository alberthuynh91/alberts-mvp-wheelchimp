angular.module('wheelchimp.createListings', [])

.controller('CreateListingsController', function ($scope, $timeout, $location, Listings) {

  $scope.createListing = {};

  $scope.submitListing = function (listing) {
    $scope.loading = true;
    $scope.listingObject = { title: $scope.listingTitle, description: $scope.listingDescription };
    Listings.postListing($scope.listingObject)
      .then(function () {
        console.log('submit listing function executed, the object is: ', $scope.listingObject);
        $scope.loading = false;
      })
      .catch(function (error) {
        console.log('There was an error submitting the listing: ', error);
      });
  };

  // $scope.addListing = function (listing) {
  //   $scope.loading = true;
  //   Listings.postListing(listing)
  //     .then(function () {
  //       $scope.loading = false;
  //     })
  //     .catch(function (error) {
  //       console.error('Error posting the listing: ', error);
  //     });
  // };

  // $scope.removeListing = function (listing) {
  //   $scope.loading = true;
  //   Listings.deleteListing(listing)
  //     .then(function () {
  //       $scope.loading = false;
  //     })
  //     .catch(function (error) {
  //       console.error('Error removing listing: ', error);
  //     });
  // }

});
