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
  var Location = Bookshelf.Model.extend({
     tableName: 'added_locations'
 });
var Locations = Bookshelf.Collection.extend({
  //model: User
  tableName: 'added_locations'
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
    Locations.forge()
    .fetch()
    .then(function (collection) {
      //res.json({error: false, data: collection.toJSON()});
      console.log(collection.toJSON());
      var locations;
      res.render('user/index', { title: 'All Locations',locations: collection.toJSON() });
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



//to form to add marker
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
        res.render('user/add_location', { user: user.toJSON() });

      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });

});


//to post/submit location
 router.post('/add_location', function(req, res, next) {
  console.log(req.body);
    Location.forge({
      user_id: req.body.user_id,
      title: req.body.title,
      comment: req.body.comment,
      lat: req.body.lat,
      lng: req.body.lng,
      //using geocomplete instead
      formatted_address: req.body.geocomplete,
      created_at: new Date()

    })
    .save()
    .then(function (user) {
      //res.json({error: false, data: {id: user.get('id')}});
        res.render('user/index', {
           userName: req.body.comment
        });
     })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
  });



//get directions
router.get('/get_direction/', function(req, res, next) {
//get the user who requested this url using id passed in 
    res.render('user/get_direction', {
             title: "Get Direction"
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
