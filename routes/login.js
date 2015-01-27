var User = require('../models/user');


module.exports = function (app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/api/login', function (req, res) {
        res.json(req.user);
    });

    // process the login form
    app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
        req.user.password = undefined;
        res.send(req.user);
    });

    // process the signup form
    app.post('/api/signup', function (req, res) {
        User.findOne({'email': req.body.email}, function (err, user) {
            // if there are any errors, return the error
            if (err) {
                res.send(500, err);
            }
            // check to see if theres already a user with that email
            if (user) {
                res.send(500, {error: req.i18n.t("signup.email_taken")});
            } else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser = new User(req.body);
                newUser.password = newUser.generateHash(req.body.passwd);
                delete newUser.passwd;
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        res.send(500, err);
                    }
                    res.send(newUser);
                });
            }

        });
    });

    app.get('/api/loggedin', function(req, res) {
        if(req.isAuthenticated()) {
            req.user.password = undefined;
            res.send(req.user);
        } else {
            res.send('0');
        }
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function (req, res) {
        req.logout();
        res.json({status: true});
    });
};

var auth = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send(401);
};