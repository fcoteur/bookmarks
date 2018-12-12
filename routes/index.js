var express = require('express');
var passport = require('passport');
var async = require('async');

var Account = require('../models/account');
var Favorite = require('../models/favorite');
var Group = require('../models/group');

var router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/bookmarks')
});

router.get('/bookmarks', function (req, res) {
  async.parallel({
    favorite_count: function(callback) {
        Favorite.countDocuments({}, callback);
    },
    group_count: function(callback) {
        Group.countDocuments({}, callback);
    }
  }, function(err, results) {
      res.render('index', { title: 'List of Favorites', error: err, data: results, user: req.user });
  });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;

module.exports = router;
