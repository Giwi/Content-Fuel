var mongoose = require('mongoose');

module.exports = mongoose.model('Locale', mongoose.Schema({
    code: Number,
    name: String,
    default: Boolean,
    cmAPI: Boolean,
    publish: Boolean,
    cdAPI: Boolean
}));