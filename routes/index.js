var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
      var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";


  //res.render('index', { title: 'Express' });
  res.render('index', {
        drinks: drinks,
        tagline: tagline
    });
  //using ejs instead of jade for html
   //res.sendfile('views/index.html');
});




//for login
// router.post('/login', function (req, res) {

//     var person = {
//         name: req.params.username,
//         email: req.params.email
//     };

//     var data = new dataSchema(person);

//     data.save(function (error, data){
//         if(error) {
//             console.log(error);
//             res.json(data);
//         }
//         else {
//             res.json(data);
//         }
//     });
// });






/* GET about page. */
router.get('/about', function(req, res, next) {

 //using ejs instead of jade for html
   res.render('about');
});


module.exports = router;
