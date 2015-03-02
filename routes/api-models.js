var EntryModel = require('../models/entryModel');
module.exports = function (app, passport) {
    // get List
    app.get('/api/model', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        EntryModel.find({author: req.user._id}).populate('status').exec(function (err, models) {
            if (err) {
                throw err;
            }
            res.json(models);
        });
    });
    // get model
    app.get('/api/model/get/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        EntryModel.findById(req.params.id).populate('author').populate('fields').populate('status').exec(function (err, model) {
            if (err) {
                throw err;
            }
            res.json(model);
        });
    });
    // create model
    app.put('/api/model', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        var newModel = new EntryModel();
        newModel.name = req.body.name;
        newModel.description = req.body.description;
        newModel.status = req.body.status;
        newModel.fields = req.body.fields;
        newModel.fields = req.body.fields;
        newModel.author = req.user._id;
        newModel.createDate = new Date();
        newModel.modifiedDate = new Date();
        newModel.version = 1;


        // save the model
        newModel.save(function (err) {
            if (err) {
                throw err;
            }
            res.json(newModel);
        });
    });

    // delete a model
    app.delete('/api/model/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
        EntryModel.remove({
            _id: req.params.id
        }, function (err, model) {
            if (err)
                res.send(err);

            EntryModel.find(function (err, models) {
                if (err)
                    res.send(err)
                res.json(models);
            });
        });
    });
}