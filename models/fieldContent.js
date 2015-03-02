var mongoose = require('mongoose');

module.export = mongoose.model('FieldContent', mongoose.Schema({
    type: {type : mongoose.Schema.Types.ObjectId, ref : 'Field'},
    content : String
}));
