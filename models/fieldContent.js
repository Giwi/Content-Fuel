var mongoose = require('mongoose');

module.export = mongoose.model('FieldContent', mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
    content : String
}));
