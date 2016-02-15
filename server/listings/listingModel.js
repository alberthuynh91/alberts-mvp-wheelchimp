var mongoose = require('mongoose');
var crypto = require('crypto');

var getPrice = function (num) {
  return (num / 100).toFixed(2);
}

var setPrice = function (num) {
  return num * 100;
}

// var ListingSchema = new mongoose.Schema({
//   description: String,
//   title: String
// });

var ListingSchema = new mongoose.Schema({

  description: String,
  img: { data: Buffer, contentType: String },
  price: { type: Number, get: getPrice, set: setPrice },
  title: { type: String, required: true},
  visits: Number,
  location: String,
  created_at: { type: Date },
  updated_at: { type: Date },
  wheel_specs: { frontdiameter: Number, 
                reardiameter: Number, 
                frontoffset: Number, 
                rearoffset: Number,
                frontwidth: Number,
                rearwidth: Number, 
                boltpattern: String
  },
  optional_specs: { frontLipSize: Number,
                    rearLipSize: Number,
                    faceColor: String,
                    condition: String
  }
});

var createSha = function (url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

ListingSchema.pre('save', function (next) {
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
  // var code = createSha(this.url);
  // this.code = code;
  // next();
});

module.exports = mongoose.model('listing', ListingSchema);