var Favorite = require('../models/favorite');
var Group = require('../models/group');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Groups.
exports.group_list = function(req, res, next) {
    Group.find()
      .exec(function (err, list_groups) {
        if (err) { return next(err); }
        res.render('group_list', { title: 'Group List', group_list: list_groups });
      });
      
  };

// Display detail page for a specific Group.
exports.group_detail = function(req, res, next) {

  async.parallel({
      group: function(callback) {
          Group.findById(req.params.id)
            .exec(callback);
      },

      group_favorites: function(callback) {
        Favorite.find({ 'group': req.params.id })
        .exec(callback);
      },

  }, function(err, results) {
      if (err) { return next(err); }
      if (results.group==null) { // No results.
          var err = new Error('Group not found');
          err.status = 404;
          return next(err);
      }
      // Successful, so render
      res.render('group_detail', { title: 'Group Detail', group: results.group, group_favorites: results.group_favorites } );
  });

};

// Display Group create form on GET.
exports.group_create_get = function(req, res, next) {
    res.render('group_form', { title: 'Create Group', errors: [] });
};

// Handle Group create on POST.
exports.group_create_post = [
    body('name', 'Group name required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      var group = new Group(
        { name: req.body.name }
      ); 
      if (!errors.isEmpty()) {
        res.render('group_form', { title: 'Create Group', group: group, errors: errors.array()});
      return;
      }
      else {
        // Check if Group with same name already exists.
        Group.findOne({ 'name': req.body.name })
          .exec( function(err, found_group) {
             if (err) { return next(err); }
             if (found_group) {
               // Group exists, redirect to its detail page.
               res.redirect(found_group.url);
             }
             else {
               group.save(function (err) {
                 if (err) { return next(err); }
                 // Genre saved. Redirect to genre detail page.
                 res.redirect(group.url);
               });
  
             }
  
           });
      }
    }
  ];

// Display Group delete form on GET.
exports.group_delete_get = function(req, res, next) {

  async.parallel({
      group: function(callback) {
          Group.findById(req.params.id).exec(callback)
      },
      favorites_group: function(callback) {
        Favorite.find({ 'group': req.params.id }).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.group==null) { // No results.
          res.redirect('/groups');
      }
      // Successful, so render.
      res.render('group_delete', { title: 'Delete Group', group: results.group, group_favorites: results.favorites_group } );
  });

};

// Handle Group delete on POST.
exports.group_delete_post = function(req, res, next) {

  async.parallel({
      group: function(callback) {
        Group.findById(req.body.groupid).exec(callback)
      },
      favorites_group: function(callback) {
        Favorite.find({ 'group': req.body.groupid }).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      // Success
      if (results.favorites_group.length > 0) {
          // Group has favorites. Render in same way as for GET route.
          res.render('group_delete', { title: 'Delete Group', group: results.group, group_favorites: results.favorites_group } );
          return;
      }
      else {
          // Group has no favorites. Delete object and redirect to the list of groups.
          Group.findByIdAndRemove(req.body.groupid, function deleteGroup(err) {
              if (err) { return next(err); }
              // Success - go to author list
              res.redirect('/groups')
          })
      }
  });
};

// Display Group update form on GET.
exports.group_update_get = function(req, res, next) {

  async.parallel({
      group: function(callback) {
          Group.findById(req.params.id).exec(callback);
      }
      }, function(err, results) {
          if (err) { return next(err); }
          if (results.group==null) { // No results.
              var err = new Error('Genre not found');
              err.status = 404;
              return next(err);
          }
          // Success.
          res.render('group_form', { title: 'Update Group', group:results.group, errors: [] });
      });

};

// Handle Group update on POST.
exports.group_update_post = [
  body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
  sanitizeBody('name').trim().escape(),
  (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Group object with escaped/trimmed data and old id.
      var group = new Group(
        { name: req.body.name,
          _id:req.params.id
         });

      if (!errors.isEmpty()) {
              res.render('group_form', { title: 'Update Group',group:group, errors: errors.array() });
          return;
      }
      else {
          // Data from form is valid. Update the record.
          Group.findByIdAndUpdate(req.params.id, group, {}, function (err,thegroup) {
              if (err) { return next(err); }
                 // Successful - redirect to book detail page.
                 res.redirect(thegroup.url);
              });
      }
  }
];