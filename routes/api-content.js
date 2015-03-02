var content = require('../models/content');
module.exports = function (app, passport) {
    // get List
    app.get('/api/content', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        content.find({owner: req.user._id}).populate('status').exec(function (err, models) {
            if (err) {
                throw err;
            }
            res.json(contents);
        });
    });
    // get model
    app.get('/api/content/get/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        content.findById(req.params.id).populate('author').populate('fields').populate('status').exec(function (err, model) {
            if (err) {
                throw err;
            }
            res.json(content);
        });
    });
    // create model
    app.put('/api/content', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        var newContent = new content();
        newContent.name = req.body.name;
        newContent.description = req.body.description;
        newContent.status = req.body.status;
        newContent.fields = req.body.fields;
        newContent.fields = req.body.fields;
        newContent.author = req.user._id;
        newContent.createDate = new Date();
        newContent.modifiedDate = new Date();
        newContent.version = 1;


        // save the space
        newContent.save(function (err) {
            if (err) {
                throw err;
            }
            res.json(newContent);
        });
    });

    // delete a space
    app.delete('/api/content/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
        content.remove({
            _id: req.params.id
        }, function (err, content) {
            if (err)
                res.send(err);

            content.find(function (err, contents) {
                if (err)
                    res.send(err)
                res.json(contents);
            });
        });
    });
}