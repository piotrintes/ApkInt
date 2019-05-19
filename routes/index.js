var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
	clientID: '926261858965-6gnlb0vupah8bmre489u3va9qajj4vff.apps.googleusercontent.com',   // ID do google
	clientSecret: 'H17O6XTUTXB7bDGPSnrhruOi', // klucz do google
	callbackURL: 'http://localhost:3000/auth/google/callback'
},
function (accessToken, refreshToken, profile, cb) {
	//console.log('....', accessToken, refreshToken, profile, cb);
	
	//check if user exists, if not create entry in database
	let query = 'SELECT * FROM `Users` WHERE `token` = "' + profile.id + '" AND `exists` = true';
	
	dbconn.query(query, function (err, result) {
		if (result.length == 0)
		{
			//create new entry
			query = 'INSERT INTO `Users` (`token`,`exists`) VALUES ("' + profile.id + '", true)';
			dbconn.query(query, function (err, result1) {
			});
		}
	});
	
	
	return cb(null, {
		user: profile.id,
		name: profile.displayName,
		status: 1
	});
}
));


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

router.get('/auth/google', passport.authenticate('google', {
	scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback',
		   passport.authenticate('google', {
			   successRedirect: '/',
			   failureRedirect: '/'
		   }));

/* GET home page. */

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

////////////////////	CSS test page
router.get('/dev', function(req, res, next) {
	res.render('template', { page: "main", title: 'Strona główna', user: req.user });
});

////////////////////	main page
router.get('/', function(req, res, next) {
	res.render('index', { page: "main", title: 'Strona główna', user: req.user });
});

////////////////////	User panel
router.get('/user', function(req, res, next) {
	
	let userID;
	let query = 'SELECT * FROM `Users` WHERE `token` = "' + req.user.user + '" AND `exists` = true';
	
	dbconn.query(query, function (err, result) {
		userID = result[0].userID;
		console.log(userID);
		
		query = 'SELECT * FROM `Reservations` INNER JOIN `Cars` ON Reservations.carID = Cars.carID WHERE `userID` = "' + userID + '" ORDER BY `time1` DESC';
		
		dbconn.query(query, function (err, result1) {
			//console.log(result[0]);
			res.render('user', {
				page: 'main',
				title: 'Moje wypożyczenia',
				userID: userID,
				list: result1,
				user: req.user
			});
		});
	});
});

////////////////////	Cars list
router.get('/cars/:filter', function(req, res, next) {
	
	let query;
	
	if(req.param("filter",0) == "all")
		query = 'SELECT * FROM `Cars` WHERE `exists` = true ORDER BY `price`';
	else
		query = 'SELECT * FROM `Cars` WHERE `category` = "' + req.param("filter",0) + '" AND `exists` = true ORDER BY `price`';
	
	dbconn.query(query, function (err, result) {
		if (result.length == 0)
		{
			res.render('error', { page: 'Element is not found is database', title: 'Samochody' });
		} else {
			//console.log(result[0]);
			res.render('cars', {
				page: 'main',
				title: 'Samochody',
				list: result,
				user: req.user
			});
		}
	});
});

////////////////////	Car page
router.get('/car/:carID', function(req, res, next) {
	
	let query = 'SELECT * FROM `Cars` WHERE `carID` = "' + req.param("carID",0) + '" AND `exists` = true';
	
	dbconn.query(query, function (err, result) {
		if (result.length == 0)
		{
			res.render('error', { page: 'Element is not found is database', title: 'Samochód' });
		} else {
			let userID;
			let query;
			if (req.user){
				query = 'SELECT * FROM `Users` WHERE `token` = "' + req.user.user + '" AND `exists` = true';
			} else {
				query = 'SELECT * FROM `Users` WHERE `token` = 0 AND `exists` = true';
			}
			let hasCar = false;
			
			dbconn.query(query, function (err, result1) {
				if (result1.length > 0){
					userID = result1[0].userID;
					
					query = 'SELECT * FROM `Reservations` INNER JOIN `Cars` ON Reservations.carID = Cars.carID WHERE `userID` = "' + userID + '" AND `time2` IS NULL';
					
					dbconn.query(query, function (err, result2) {
						if (result2.length > 0) hasCar = true;
						console.log(hasCar);
						res.render('car', {
							page: 'main',
							title: 'Samochód',
							car: result[0],
							user: req.user,
							hasCar: hasCar
						});
					});
				} else {
					res.render('car', {
						page: 'main',
						title: 'Samochód',
						car: result[0],
						user: req.user,
						hasCar: hasCar
					});
				}
			});
			//console.log(result[0]);
		}
	});
});

////////////////////	Register car action
router.get('/regcar/:carID', function(req, res, next) {
	
	let userID;
	let query = 'SELECT * FROM `Users` WHERE `token` = "' + req.user.user + '" AND `exists` = true';
	
	dbconn.query(query, function (err, result) {
		userID = result[0].userID;
	});
	
	query = 'SELECT * FROM `Reservations` INNER JOIN `Cars` ON Reservations.carID = Cars.carID WHERE `userID` = "' + userID + '" AND `time2` IS NULL ORDER BY `time1` DESC';
	//console.log(query);
	dbconn.query(query, function (err, result) {
		//console.log(result);
		if (result.length == 0)
		{
			let time = new Date();
			time.setHours( time.getHours() + 4 );
			let timeT = time.toISOString().replace(/T/, ' ').replace(/\..+/, '')
			query = 'INSERT INTO `Reservations` (`userID`,`carID`,`time1`,`exists`) VALUES (' + userID + ',' + req.param("carID",0) + ',\'' + timeT + '\',true)';
			//console.log(query);
			dbconn.query(query, function (err1, result1) {
				//console.log(result1);
				query = 'UPDATE `Cars` set `avalible` = false WHERE `carID` = ' + req.param("carID",0);
				dbconn.query(query, function (err1, result1) {
				});
			});
		}
	});
	res.redirect('/user');
});

////////////////////	Return car action
router.get('/returncar/:resID/:carID', function(req, res, next) {
	
	let userID;
	let query = 'SELECT * FROM `Users` WHERE `token` = "' + req.user.user + '" AND `exists` = true';
	
	dbconn.query(query, function (err, result) {
		userID = result[0].userID;
	});
	
	let time = new Date();
	time.setHours( time.getHours() + 4 );
	let timeT = time.toISOString().replace(/T/, ' ').replace(/\..+/, '')
	query = 'UPDATE `Reservations` set `time2` = \'' + timeT + '\' WHERE `reservationID` = ' + req.param("resID",0);
	//console.log(query);
	dbconn.query(query, function (err, result) {
		console.log(result);
		if (result.length == 0)
		{
			res.render('error', { page: 'Element is not found is database', title: 'Samochód' });
		} else {
			query = 'UPDATE `Cars` set `avalible` = true WHERE `carID` = ' + req.param("carID",0);
			dbconn.query(query, function (err1, result1) {
			});
		}
	});
	res.redirect('/user');
});

module.exports = router;
