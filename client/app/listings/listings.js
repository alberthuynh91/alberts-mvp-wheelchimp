angular.module('wheelchimp.listings', [])

.controller('ListingsController', function ($scope, $location, Listings) {

  $scope.listing = {};

  var initializeListings = function () {
    Listings.getListings()
      .then(function (data) {
        $scope.listing.listings = data;
      })
      .catch(function (error) {
        console.error('Error initializing the listings: ', error);
      });
  };

  $scope.addListing = function (listing) {
    $scope.loading = true;
    Listings.postListing(listing)
      .then(function () {
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error('Error posting the listing: ', error);
      });
  };

  $scope.removeListing = function (listing) {
    $scope.loading = true;
    Listings.deleteListing(listing)
      .then(function () {
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error('Error removing listing: ', error);
      });
  };

  initializeListings();
});