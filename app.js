var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var TwitterStrategy = require('passport-twitter');
var GoogleStrategy = require('passport-google');
var FacebookStrategy = require('passport-facebook');
var flash = require('connect-flash');
var i18n = require("i18next");
i18n.init();


var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var User = require('./models/user');

var locale = require("locale");
var supported = ["en", "en_US", "fr", "fr_FR"];
app.use(locale(supported));
app.use(i18n.handle);

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport.js')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(cookieParser())
app.use(bodyParser());
// required for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/index')(app, passport);
require('./routes/login')(app, passport);
require('./routes/api-settings')(app, passport);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

passport.use(new BearerStrategy(
    function (token, done) {
        User.findOne({token: token}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, {scope: 'all'});
        });
    }
));
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
app.listen(port);
console.log('The magic happens on port ' + port);