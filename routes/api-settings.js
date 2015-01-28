var Space = require('../models/space');
var Locale = require('../models/locale');
module.exports = function (app, passport) {
    // get List
    app.get('/api/space',passport.authenticate('bearer', { session: false }), function (req, res, next) {
        Space.find({owner : req.user._id}).exec(function (err, spaces) {
            if (err) {
                throw err;
            }
            res.json(spaces);
        });
    });
    // get space
    app.get('/api/space/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        Space.find(req.params.id).exec(function (err, spaces) {
            if (err) {
                throw err;
            }
            res.json(spaces);
        });
    });
    // create space
    app.put('/api/space', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        var newSpace = new Space();
        newSpace.name = req.body.name;
        Locale.find(null).exec(function (err, locales) {
            if (err) {
                throw err;
            }
            newSpace.locales = locales;
        });
        newSpace.contributors.push(req.user._id);
        // save the user
        newSpace.save(function (err) {
            if (err) {
                throw err;
            }
            res.json(newSpace);
        });
    });

    // delete a space
    app.delete('/api/space/:id', passport.authenticate('bearer', {session: false}), function(req, res) {
        Space.remove({
            _id : req.params.id
        }, function(err, space) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Space.find(function(err, spaces) {
                if (err)
                    res.send(err)
                res.json(spaces);
            });
        });
    });
}