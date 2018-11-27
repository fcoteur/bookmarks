var Favorite = require('../models/favorite');

// Display list of all Favorites.
exports.favorite_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite list');
};

// Display detail page for a specific FAvorite.
exports.favorite_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: FAvorite detail: ' + req.params.id);
};

// Display Favorite create form on GET.
exports.favorite_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite create GET');
};

// Handle Favorite create on POST.
exports.favorite_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite create POST');
};

// Display Favorite delete form on GET.
exports.favorite_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite delete GET');
};

// Handle Favorite delete on POST.
exports.favorite_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite delete POST');
};

// Display Favorite update form on GET.
exports.favorite_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite update GET');
};

// Handle Author update on POST.
exports.favorite_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: FAvorite update POST');
};