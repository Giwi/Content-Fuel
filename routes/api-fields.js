var Field = require('../models/Field');
var FieldType = require('../models/FieldType');
module.exports = function (app, passport) {
    // get List
    app.get('/api/fields', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        Field.find({owner: req.user._id}).populate('status').populate('type').exec(function (err, fields) {
            if (err) {
                throw err;
            }
            res.json(fields);
        });
    });
    // get field
    app.get('/api/fields/get/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        Field.findById(req.params.id).populate('author').populate('type').populate('status').exec(function (err, field) {
            if (err) {
                throw err;
            }
            res.json(field);
        });
    });
    // create field
    app.put('/api/fields', passport.authenticate('bearer', {session: false}), function (req, res, next) {
        var newField = new Field();
        newField.title = req.body.title;
        newField.description = req.body.description;
        newField.mandatory = req.body.mandatory;
        newField.usedAsTitle = req.body.usedAsTitle;
        newField.author = req.user._id;
        newField.type = req.type._id;
        newField.createDate = new Date();
        newField.modifiedDate = new Date();
        newField.version = 1;


        // save the space
        newField.save(function (err) {
            if (err) {
                throw err;
            }
            res.json(newField);
        });
    });

    // delete a field
    app.delete('/api/fields/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
        Field.remove({
            _id: req.params.id
        }, function (err, field) {
            if (err)
                res.send(err);

            content.find(function (err, fields) {
                if (err)
                    res.send(err)
                res.json(fields);
            });
        });
    });
}