
// =======================
// get the packages we need ============
// =======================

var socketioJwt   = require("socketio-jwt");
var express = require('express');
var orm = require("orm");
var fs = require('fs');


//db connections
var mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'root';
var DATABASE = 'node_demo';
var TABLE = 'gadgets';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : HOST,
    user     : MYSQL_USER,
    password : MYSQL_PASS,
    database : DATABASE,
    charset  : 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);

var Schema = require('./schema');

var app = express();

//==============adding logging using winston==========
var logger = require("./logger");
logger.debug("Overriding 'Express' logger");
app.use(require('morgan')({ "stream": logger.stream }));


// // dynamically include routes (Controller)
// fs.readdirSync('./controllers').forEach(function (file) {
//   if(file.substr(-3) == '.js') {
//       route = require('./controllers/' + file);
//       route.controller(app);
//   }
// });




// var connection = mysql.createConnection({
//     host     : HOST,
//     user     : MYSQL_USER,
//     password : MYSQL_PASS,
//     database : DATABASE,
// });

// connection.connect();


// //connection.connect();
// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... \n\n");  
// } else {
//     console.log("Error connecting database ... \n\n");  
// }
// });

//////==================creating models========================
// User model
var User = Bookshelf.Model.extend({
    tableName: 'users'
});
// Post model
var Post = Bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    category: function () {
      return this.belongsTo(Category, 'category_id');
    },
    tags: function () {
        return this.belongsToMany(Tag);
    },
    author: function () {
        return this.belongsTo(User);
    }
});
// Category model
var Category = Bookshelf.Model.extend({
    tableName: 'categories',
    posts: function () {
       return this.belongsToMany(Post, 'category_id');
    }
});
// Tag model
var Tag = Bookshelf.Model.extend({
    tableName: 'tags',
    posts: function () {
       return this.belongsToMany(Post);
    }
});


//test db records
// User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {

//   console.log(user);

// }).catch(function(err) {

//   console.error(err);

// });



//added for layouts
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var angular = require('./routes/angular');



// view engine setup
//added ejs-locals 
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
app.use('/users', users);
app.use('/angular', angular);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
