var express = require('express');
var router = express.Router();
var dt = require('datetimejs');
var strftime = require('strftime');



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
 var User = Bookshelf.Model.extend({
     tableName: 'users'
 });
var Users = Bookshelf.Collection.extend({
  //model: User
  tableName: 'users'
});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/', function(req, res, next) {


//   res.render('user/index', { title: 'Express' });


// });

  // fetch all users
  router.get('/', function(req, res, next) {
    Users.forge()
    .fetch()
    .then(function (collection) {
      //res.json({error: false, data: collection.toJSON()});
      console.log(collection.toJSON());
      var users;
      res.render('user/index', { title: 'All Users',users: collection.toJSON() });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })


router.get('/new', function(req, res, next) {


  res.render('user/new', { title: 'Express' });


});


// knex("users").insert({
//     first_name: "John",
//     last_name: "Doe"
// }).exec(function (err, id) {
//     console.log("Fulfilled", id);
// });



//to add start/end locations
router.get('/add_location/:id', function(req, res, next) {
//get the user who requested this url using id passed in 

    User.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        //res.json({error: false, data: user.toJSON()});
        console.log(user.toJSON());
        res.render('user/location', { user: user.toJSON() });

      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });

});

// router.post('/', function(req, res, next) {

// //var userName =  req.query['username'];
//  console.log(req.body);
// var email =  req.body.email;
// //var password =  req.body.password;

// console.log(email);

//   //res.render('user_created', { title: 'Express' });
//     res.render('user/create', {
//         userName: req.body.email
//     });


// });



 router.post('/', function(req, res, next) {
 	console.log(req.body);
    User.forge({
      name: req.body.username,
      email: req.body.email,
      about_yourself: req.body.about_yourself,
      lat: req.body.lat,
      lng: req.body.lng,
      formatted_address: req.body.formatted_address,
      created_at: new Date()

    })
    .save()
    .then(function (user) {
      //res.json({error: false, data: {id: user.get('id')}});
	      res.render('user/create', {
	         userName: req.body.email
	      });
     })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
  });




module.exports = router;
