var Favorite = require('../models/favorite');
var Group = require('../models/group');
var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        favorite_count: function(callback) {
            Favorite.countDocuments({}, callback);
        },
        group_count: function(callback) {
            Group.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'List of Favorites', error: err, data: results });
    });
};

// Display list of all Favorites.
exports.favorite_list = function(req, res) {
  Favorite.find({}, 'name')
  .populate('group')
  .exec(function (err, list_favorites) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('favorite_list', { title: 'Favorite List', favorite_list: list_favorites });
  });
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