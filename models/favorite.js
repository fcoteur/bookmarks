var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FavoriteSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    web: {type: String, required: true, max: 100},
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
  }
);

// Virtual for favorite's URL
FavoriteSchema
.virtual('url')
.get(function () {
  return '/bookmarks/favorite/' + this._id;
});


//Export model
module.exports = mongoose.model('Favorite', FavoriteSchema);