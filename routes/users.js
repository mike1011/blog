var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {


  res.render('users', { title: 'Express' });


});

router.post('/', function(req, res, next) {

//var userName =  req.query['username'];
 console.log(req.body);
var email =  req.body.email;
//var password =  req.body.password;

console.log(email);

  //res.render('user_created', { title: 'Express' });
    res.render('user_created', {
        userName: req.body.email
    });


});




module.exports = router;
