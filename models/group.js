var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema(
  {
    name: {type: String, required: true, max: 100}
  }
);

// Virtual for group's URL
GroupSchema
.virtual('url')
.get(function () {
  return '/bookmarks/group/' + this._id;
});

//Export model
module.exports = mongoose.model('Group', GroupSchema);