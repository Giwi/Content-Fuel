var mongoose = require('mongoose');

module.exports = mongoose.model('Webhook', mongoose.Schema({
    url: String,
    username: String,
    password : String
}));