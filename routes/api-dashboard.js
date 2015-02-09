var Space = require('../models/space');
var Locale = require('../models/locale');

module.exports = function (app, passport) {
    // get meta
    app.get('/api/dashboard', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        var result = {};
        Space.find({owner: req.user._id}).exec(function (err, spaces) {
            if (err) {
                throw err;
            }
            result.spaces = spaces;

            res.json(result);
        });
    });

}