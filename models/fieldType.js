var mongoose = require('mongoose');


module.exports = mongoose.model('FieldType', mongoose.Schema({
    name: String
}));