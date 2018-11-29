var Favorite = require('../models/favorite');
var Group = require('../models/group');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Group.
exports.group_list = function(req, res, next) {
    Group.find()
      .exec(function (err, list_groups) {
        if (err) { return next(err); }
        // Successful, so render
        console.log(list_groups)
        res.render('group_list', { title: 'Group List', group_list: list_groups });
      });
      
  };

// Display detail page for a specific Group.
exports.group_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Group detail: ' + req.params.id);
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
exports.group_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Group delete GET');
};

// Handle Group delete on POST.
exports.group_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Group delete POST');
};

// Display Group update form on GET.
exports.group_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Group update GET');
};

// Handle Group update on POST.
exports.group_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Group update POST');
};