var mongoose = require('mongoose');

module.export = mongoose.model('FieldContent', mongoose.Schema({
    type: Schema.Types.ObjectId,
    content : String
}));
