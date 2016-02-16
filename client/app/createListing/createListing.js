angular.module('wheelchimp.createListings', [])

.controller('CreateListingsController', function ($scope, $location, Listings) {

  $scope.createListing = {};
  $scope.listingObject = {};

  $scope.stepsModel = [];

  $scope.imageUpload = function(event){
       var files = event.target.files; //FileList object

       for (var i = 0; i < files.length; i++) {
           var file = files[i];
               var reader = new FileReader();
               reader.onload = $scope.imageIsLoaded; 
               reader.readAsDataURL(file);
       }
  };

  $scope.imageIsLoaded = function(e){
      $scope.$apply(function() {
          $scope.stepsModel.push(e.target.result);
      });
  };

  // Submit listing function 
  $scope.submitListing = function () {

    $scope.loading = true;
    $scope.uploadedImage = 'default.jpg';

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
      img: $scope.uploadedImage
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

  // Function for photo uploading
  $scope.onFileSelect = function(image) {
    console.log('onFileSelect function executed! Image passed in: ', image);
    Listings.uploadImage(image)
      .then(function (data) {
        console.log('Photo has been selecting and now uploading...', data);
        $scope.uploadedImage = JSON.parse(data);  
      })
      .catch(function (error) {
        console.log('Error uploading photo: ', error);
      });

    // console.log('Initializing photo upload');
    // if (angular.isArray(image)) {
    //     image = image[0];
    // }

    // // This is how I handle file types in client side
    // if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
    //     alert('Only PNG and JPEG are accepted.');
    //     return;
    // }

    // $scope.uploadInProgress = true;
    // $scope.uploadProgress = 0;

    // $scope.upload = $upload.upload({
    //     url: '/upload/image',
    //     method: 'POST',
    //     file: image
    // }).progress(function (event) {
    //     $scope.uploadProgress = Math.floor(event.loaded / event.total);
    //     $scope.$apply();
    // }).success(function (data, status, headers, config) {
    //     $scope.uploadInProgress = false;
    //     // If you need uploaded file immediately 
    //     console.log('File has finished uploading');
    //     $scope.uploadedImage = JSON.parse(data);      
    // }).error(function(err) {
    //     $scope.uploadInProgress = false;
    //     console.log('Error uploading file: ' + err.message || err);
    // });
  };
});
