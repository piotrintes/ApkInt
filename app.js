var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/// - utworzenie sesji
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session({ secret: 'secret', saveUninitialized: false, resave: false, cookie: { maxAge: 1000 } }));


app.use('/', indexRouter);
app.use('/users', usersRouter);


////////////////////// Packages

//require mysql
var mysql = require('mysql');
dbconn = mysql.createConnection({
	user: 'root',
	password: 'password',
	database: 'Wypozyczalnia'
});
dbconn.connect();



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
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

/* Login via google information:
 * Client ID: 926261858965-6gnlb0vupah8bmre489u3va9qajj4vff.apps.googleusercontent.com
 * Client Secret: H17O6XTUTXB7bDGPSnrhruOi
 * 
 */
