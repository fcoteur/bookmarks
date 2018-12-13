var express = require('express');
var router = express.Router();

var bookmark_controller = require('../controllers/bookmarksController');
var group_controller = require('../controllers/groupsController');

/// FAVORITE ROUTES ///

router.get('/bookmark/create', checkAuthentication, bookmark_controller.bookmark_create_get);
router.post('/bookmark/create',checkAuthentication, bookmark_controller.bookmark_create_post);
router.get('/bookmark/:id/delete',checkAuthentication, bookmark_controller.bookmark_delete_get);
router.post('/bookmark/:id/delete',checkAuthentication, bookmark_controller.bookmark_delete_post);
router.get('/bookmark/:id/update',checkAuthentication, bookmark_controller.bookmark_update_get);
router.post('/bookmark/:id/update',checkAuthentication, bookmark_controller.bookmark_update_post);
router.get('/bookmark/:id', bookmark_controller.bookmark_detail);
router.get('/bookmarks', bookmark_controller.bookmark_list);

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
