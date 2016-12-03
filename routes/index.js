var express = require('express');
var router = express.Router();
var form = require('express-form');
var field = form.field;
var validate = form.validate;
var redis   = require("redis");
var client  = redis.createClient();


var flash = require('express-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.NODE_ENV);
  res.render('login', { title: 'Express' });
});


var validationMiddleware = form(
    validate("username", "Nickname").required("", "What is your %s?"),
    validate("username", "Nickname").custom(function(value, source) {
        console.log(source);

        /*if( session.nickname ){
            console.log(session.nickname);
        }*/
/*
      if (value !== "admin") {
        throw new Error("%s must be 'admin'.");
      }*/
    })
);

router.post('/sign-in', validationMiddleware,function(req, res, next){
    console.log(req.session.nickname);
    var sess = req.session;
  if (!req.form.isValid) {
    //console.log(req.form.getErrors());
    res.render('login');
  }
  else {
    //req.session.nickname = req.body.username;
      client.HSET('nickname1', req.body.username, 'asa');
    req.session.nickname = req.body.username;
    res.render('login', { title: 'Express' });
  }


});

module.exports = router;
