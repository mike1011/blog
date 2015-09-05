module.exports.set = function(app) {
   // copy your routes listed in your app.js directly into here
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

			module.exports = router;

}