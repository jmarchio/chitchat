var express = require('express');
var router = express.Router();
var form = require('express-form');
var field = form.field;
var flash = require('express-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.NODE_ENV);
  res.render('login', { title: 'Express' });
});

router.post('/sign-in', form(field('username').trim().required()),function(req, res, next){
  if (!req.form.isValid) {
    console.log(req.form.getErrors());
    req.flash('error1', req.form.getErrors());
    //res.status(500).send('yes')
    res.render('login');
  }
  else {

    res.render('index', { title: 'Express' });
  }


});

module.exports = router;
