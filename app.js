var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
var flash = require('express-flash');



var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, 'assets/sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: false,
  outputStyle: 'compressed',
  prefix:  '/css',
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: 'ssshhhhh',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));*/


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
