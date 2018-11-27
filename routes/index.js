var express = require('express');
var router = express.Router();

// route to homepage
router.get('/', function(req, res) {
  res.redirect('/favorite');
});

// Require controller modules.
var favorite_controller = require('../controllers/favoritesController');

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

// GET request for list of all Authors.
router.get('/favorite', favorite_controller.favorite_list);


module.exports = router;
