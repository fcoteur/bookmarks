var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FavoriteSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    url: {type: String, required: true, max: 100}
  }
);

//Export model
module.exports = mongoose.model('Favorite', FavoriteSchema);