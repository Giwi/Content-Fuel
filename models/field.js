var mongoose = require('mongoose');

module.exports = mongoose.model('Field', mongoose.Schema({
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'FieldType'},
    title: String,
    description: String,
    mandatory: Boolean,
    usedAsTitle: Boolean,
    createDate: {type: Date, default: Date.now},
    modifiedDate: {type: Date, default: Date.now},
    version: Number,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}));