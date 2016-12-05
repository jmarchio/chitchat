var express = require('express');
var router = express.Router();
var form = require('express-form');
var field = form.field;
var validate = form.validate;
var redis   = require("redis");
var client  = redis.createClient();
var authService = require('../services/auth');


var flash = require('express-flash');

/**
 * GET home
 */
router.get('/', function(req, res, next) {
  console.log(process.env.NODE_ENV);
  res.render('login', { bodyCss: 'login'});
});


router.get('/home', function(req, res, next) {
    res.render('home', { bodyCss: 'home'});
});

/**
 * Define sign in validations
 */

var validationMiddleware = form(
    validate("username", "Nickname").required("", "What is your %s?"),
    /**
     * Validates unique nickname in username space
     */
    validate("username", "Nickname").custom(function(value, source, callback) {

        client.EXISTS('username:' + source.username, function(error, reply){
            if(reply) {
                return callback(new Error('%s: '+ source.username +' is already taken.'));
            }
            else{
                callback(null);
            }

        });
    })
);

/**
 * POST sign-in
 */
router.post('/sign-in', validationMiddleware,function(req, res, next){
  if (!req.form.isValid) {
    res.render('login', { bodyCss: 'login'});
  }
  else {
    authService.create(req.body.username);
    req.session.nickname = req.body.username;
    res.render('login', { bodyCss: 'login'});
  }
});

module.exports = router;
