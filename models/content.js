var mongoose = require('mongoose');

module.exports = mongoose.model('Content', mongoose.Schema({
    fields : [{type : mongoose.Schema.Types.ObjectId, ref : 'FieldContent'}],
    locale : {type : mongoose.Schema.Types.ObjectId, ref : 'Locale'}
}));


