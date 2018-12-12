var Bookmark = require('../models/bookmark');
var Group = require('../models/group');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Bookmarks.
exports.bookmark_list = function(req, res) {
  Bookmark.find({}, 'name web')
  .populate('group')
  .exec(function (err, list_bookmarks) {
    if (err) { return next(err); }
    res.render('bookmark_list', { title: 'Bookmark List', bookmark_list: list_bookmarks });
  });
};

// Display detail page for a specific FAvorite.
exports.bookmark_detail = function(req, res, next) {

    async.parallel({
        bookmark: function(callback) {
            Bookmark.findById(req.params.id)
              .exec(callback);
        }  
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.bookmark==null) { // No results.
            var err = new Error('Bookmark not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('bookmark_detail', { title: 'Bookmark Detail', bookmark: results.bookmark } );
    });
  
  };
  

// Display Bookmark create form on GET.
exports.bookmark_create_get = function(req, res, next) {
  Group.find({},'name')
  .exec(function (err, groups) {
    if (err) { return next(err); }
    res.render('bookmark_form', {title: 'Create Bookmark', group_list:groups});
  });
};

// Handle Bookmark create on POST.
exports.bookmark_create_post = [
  body('group').isLength({ min: 1 }).trim().withMessage('group must be specified.'),
  body('name').isLength({ min: 1 }).trim().withMessage('name must be specified.'),
  body('web').isLength({ min: 1 }).trim().withMessage('web must be specified.'),
  sanitizeBody('group').trim().escape(),
  sanitizeBody('name').trim().escape(),
  (req, res, next) => {
      const errors = validationResult(req);
      var bookmark = new Bookmark(
        { group: req.body.group,
          name: req.body.name,
          web: req.body.web
         });
      if (!errors.isEmpty()) {
      Group.find({},'name')
          .exec(function (err, groups) {
              if (err) { return next(err); }
              res.render('bookmark_form', { name: 'Create Bookmark', group_list : groups, selected_group : bookmark.group._id , errors: errors.array(), bookmark:bookmark });
      });
      return;
      }
      else {
          bookmark.save(function (err) {
              if (err) { return next(err); }
                 res.redirect('/bookmarks/bookmarks');
              });
      }
  }
];

// Display Bookmark delete form on GET.
exports.bookmark_delete_get = function(req, res, next) {

  async.parallel({
      bookmark: function(callback) {
          Bookmark.findById(req.params.id).exec(callback)
      }
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.bookmark==null) { // No results.
          res.redirect('/bookmarks/bookmarks');
      }
      // Successful, so render.
      res.render('bookmark_delete', { title: 'Delete Bookmark', bookmark: results.bookmark } );
  });

};
// Handle Bookmark delete on POST.
exports.bookmark_delete_post = function(req, res, next) {

  async.parallel({
      bookmark: function(callback) {
        Bookmark.findById(req.body.bookmarkid).exec(callback)
      }
  }, function(err, results) {
      if (err) { return next(err); }
      // Success
      // Delete object and redirect to the list of authors.
      Bookmark.findByIdAndRemove(req.body.bookmarkid, function deleteBookmark(err) {
          if (err) { return next(err); }
          // Success - go to bookmark list
          res.redirect('/bookmarks/bookmarks')
      })
  });
};

// Display Bookmark update form on GET.
exports.bookmark_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Bookmark update GET');
};

// Handle Author update on POST.
exports.bookmark_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: FAvorite update POST');
};