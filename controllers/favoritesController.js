var Favorite = require('../models/favorite');
var Group = require('../models/group');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Favorites.
exports.favorite_list = function(req, res) {
  Favorite.find({}, 'name web')
  .populate('group')
  .exec(function (err, list_favorites) {
    if (err) { return next(err); }
    res.render('favorite_list', { title: 'Favorite List', favorite_list: list_favorites });
  });
};

// Display detail page for a specific FAvorite.
exports.favorite_detail = function(req, res, next) {

    async.parallel({
        favorite: function(callback) {
            Favorite.findById(req.params.id)
              .exec(callback);
        }  
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.favorite==null) { // No results.
            var err = new Error('Favorite not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('favorite_detail', { title: 'Favorite Detail', favorite: results.favorite } );
    });
  
  };
  

// Display Favorite create form on GET.
exports.favorite_create_get = function(req, res, next) {
  Group.find({},'name')
  .exec(function (err, groups) {
    if (err) { return next(err); }
    res.render('favorite_form', {title: 'Create Favorite', group_list:groups});
  });
};

// Handle Favorite create on POST.
exports.favorite_create_post = [
  body('group').isLength({ min: 1 }).trim().withMessage('group must be specified.'),
  body('name').isLength({ min: 1 }).trim().withMessage('name must be specified.'),
  body('web').isLength({ min: 1 }).trim().withMessage('web must be specified.'),
  sanitizeBody('group').trim().escape(),
  sanitizeBody('name').trim().escape(),
  (req, res, next) => {
      const errors = validationResult(req);
      var favorite = new Favorite(
        { group: req.body.group,
          name: req.body.name,
          web: req.body.web
         });
      if (!errors.isEmpty()) {
      Group.find({},'name')
          .exec(function (err, groups) {
              if (err) { return next(err); }
              res.render('favorite_form', { name: 'Create Favorite', group_list : groups, selected_group : favorite.group._id , errors: errors.array(), favorite:favorite });
      });
      return;
      }
      else {
          favorite.save(function (err) {
              if (err) { return next(err); }
                 res.redirect(favorite.url);
              });
      }
  }
];

// Display Favorite delete form on GET.
exports.favorite_delete_get = function(req, res, next) {

  async.parallel({
      favorite: function(callback) {
          Favorite.findById(req.params.id).exec(callback)
      }
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.favorite==null) { // No results.
          res.redirect('/bookmarks/favorites');
      }
      // Successful, so render.
      res.render('favorite_delete', { title: 'Delete Favorite', favorite: results.favorite } );
  });

};
// Handle Favorite delete on POST.
exports.favorite_delete_post = function(req, res, next) {

  async.parallel({
      favorite: function(callback) {
        Favorite.findById(req.body.favoriteid).exec(callback)
      }
  }, function(err, results) {
      if (err) { return next(err); }
      // Success
      // Delete object and redirect to the list of authors.
      Favorite.findByIdAndRemove(req.body.favoriteid, function deleteFavorite(err) {
          if (err) { return next(err); }
          // Success - go to favorite list
          res.redirect('/bookmarks/favorites')
      })
  });
};

// Display Favorite update form on GET.
exports.favorite_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Favorite update GET');
};

// Handle Author update on POST.
exports.favorite_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: FAvorite update POST');
};