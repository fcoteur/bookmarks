var Favorite = require('../models/favorite');
var Group = require('../models/group');


// Display list of all Group.
exports.group_list = function(req, res, next) {
    Group.find()
      .exec(function (err, list_groups) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('group_list', { title: 'Group List', group_list: list_groups });
      });
      
  };

// Display detail page for a specific Group.
exports.group_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Group detail: ' + req.params.id);
};

// Display Group create form on GET.
exports.group_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Group create GET');
};

// Handle Group create on POST.
exports.group_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Group create POST');
};

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