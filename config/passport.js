// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var uuid = require('node-uuid');
// load up the user model
var User = require('../models/user');
var BearerStrategy = require('passport-http-bearer').Strategy;
// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use('bearer', new BearerStrategy(
        function (token, done) {
            User.findOne({token: token}, function (err, user) {
                if (err) {
                    console.error(err);
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                return done(null, user, {scope: 'all'})
            });
        }
    ));
// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({'email': email}, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                }
                // if no user is found, return the message
                if (!user) {
                    return done(null, false, { message:'No user found.'});
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, { message:'Oops! Wrong password.'});
                }
                // all is well, return successful user
                user.token = uuid.v4();
                user.save(function (err) {
                    if (err) {
                        return done(err);
                    }
                });
                return done(null, user);
            });
        }));
};

