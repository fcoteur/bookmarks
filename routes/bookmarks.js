var express = require('express');
var router = express.Router();

var favorite_controller = require('../controllers/favoritesController');
var group_controller = require('../controllers/groupsController');

/// FAVORITE ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/favorite/create', favorite_controller.favorite_create_get);

// POST request for creating Author.
router.post('/favorite/create', favorite_controller.favorite_create_post);

// GET request to delete Author.
router.get('/favorite/:id/delete', favorite_controller.favorite_delete_get);

// POST request to delete Author.
router.post('/favorite/:id/delete', favorite_controller.favorite_delete_post);

// GET request to update Author.
router.get('/favorite/:id/update', favorite_controller.favorite_update_get);

// POST request to update Author.
router.post('/favorite/:id/update', favorite_controller.favorite_update_post);

// GET request for one Author.
router.get('/favorite/:id', favorite_controller.favorite_detail);

// GET request for list of all Favorites
router.get('/favorites', favorite_controller.favorite_list);


/// GROUP ROUTES ///

// GET request for creating a Group. NOTE This must come before route that displays Group (uses id).
router.get('/group/create', group_controller.group_create_get);

//POST request for creating Group.
router.post('/group/create', group_controller.group_create_post);

// GET request to delete Group.
router.get('/group/:id/delete', group_controller.group_delete_get);

// POST request to delete Group.
router.post('/group/:id/delete', group_controller.group_delete_post);

// GET request to update Group.
router.get('/group/:id/update', group_controller.group_update_get);

// POST request to update Group.
router.post('/group/:id/update', group_controller.group_update_post);

// GET request for one Group.
router.get('/group/:id', group_controller.group_detail);

// GET request for list of all Group.
router.get('/groups', group_controller.group_list);


module.exports = router;
