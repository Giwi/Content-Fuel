var mongoose = require('mongoose');

module.exports = mongoose.model('Role', mongoose.Schema({
    name: String,
    description: String,
    policies: Boolean,
    customRole : Boolean
}));