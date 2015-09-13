var express = require('express');
var router = express.Router();

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = 'root';
var DATABASE = 'node_demo';
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

var Locations = Bookshelf.Collection.extend({
  //model: User
  tableName: 'added_locations'
});



/* GET users listing. */
 router.get('/', function(req, res, next) {
   res.render('angular/test1');
 });

 


 /* GET all locations to show. */
 router.get('/get_locations', function(req, res, next) {
    Locations.forge()
    .fetch()
    .then(function (collection) {
     // res.json({error: false, data: collection.toJSON()});
     console.log("==========Getting all users============");
     //res.jsonp(collection)
      //console.log(collection.toJSON());

      //var locations;
      res.render('angular/get_locations', { title: 'All Locations',locations: collection.toJSON() });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

// router.get('/', function(req, res, next) {


//   res.render('user/index', { title: 'Express' });


// });

  

module.exports = router;
