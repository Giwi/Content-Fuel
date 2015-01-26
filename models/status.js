var mongoose = require('mongoose');

module.exports = mongoose.model('Status', mongoose.Schema({
    name: String,
    multiple : Boolean
}));