module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/api/login', function(req, res) {
        res.json(req.user);
    });

    // process the login form
    app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        console.log(req.user);
        res.send(req.user);
    });

    // process the signup form
    app.post('/api/signup', passport.authenticate('local-signup'), function(req, res) {
        console.info(req.user);
        res.send(req.user);
    });

    // process the signup form

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user);
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.json({status :  true});
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}