var mongoose = require('mongoose');

module.exports = mongoose.model('EntryModel', mongoose.Schema({
    status: {type : mongoose.Schema.Types.ObjectId, ref : 'Status'},
    name: String,
    description: String,
    fields : [{type : mongoose.Schema.Types.ObjectId, ref : 'Field'}],
    createDate : { type: Date, default: Date.now },
    modifiedDate : { type: Date, default: Date.now },
    version : Number,
    author : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
}));