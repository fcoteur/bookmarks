var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookmarkSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    web: {type: String, required: true, max: 100},
    group: {type: Schema.Types.ObjectId, ref: 'Group'}
  }
);

// Virtual for bookmark's URL
BookmarkSchema
.virtual('url')
.get(function () {
  return '/bookmarks/bookmark/' + this._id;
});


//Export model
module.exports = mongoose.model('Bookmark', BookmarkSchema);