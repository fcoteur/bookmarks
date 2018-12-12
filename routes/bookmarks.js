var express = require('express');
var router = express.Router();

var favorite_controller = require('../controllers/favoritesController');
var group_controller = require('../controllers/groupsController');

/// FAVORITE ROUTES ///

router.get('/favorite/create', checkAuthentication, favorite_controller.favorite_create_get);
router.post('/favorite/create',checkAuthentication, favorite_controller.favorite_create_post);
router.get('/favorite/:id/delete',checkAuthentication, favorite_controller.favorite_delete_get);
router.post('/favorite/:id/delete',checkAuthentication, favorite_controller.favorite_delete_post);
router.get('/favorite/:id/update',checkAuthentication, favorite_controller.favorite_update_get);
router.post('/favorite/:id/update',checkAuthentication, favorite_controller.favorite_update_post);
router.get('/favorite/:id', favorite_controller.favorite_detail);
router.get('/favorites', favorite_controller.favorite_list);

/// GROUP ROUTES ///

router.get('/group/create', checkAuthentication,group_controller.group_create_get);
router.post('/group/create',checkAuthentication, group_controller.group_create_post);
router.get('/group/:id/delete',checkAuthentication, group_controller.group_delete_get);
router.post('/group/:id/delete',checkAuthentication, group_controller.group_delete_post);
router.get('/group/:id/update',checkAuthentication, group_controller.group_update_get);
router.post('/group/:id/update',checkAuthentication, group_controller.group_update_post);
router.get('/group/:id', group_controller.group_detail);
router.get('/groups', group_controller.group_list);


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
}

module.exports = router;
