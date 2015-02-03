var mongoose = require('mongoose');

module.exports = mongoose.model('Field', mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
    title: String,
    fieldId : String,
    mandatory : Boolean,
    usedAsTitle : Boolean
}));