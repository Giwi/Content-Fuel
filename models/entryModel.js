var mongoose = require('mongoose');

module.exports = mongoose.model('EntryModel', mongoose.Schema({
    status: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    fields : [mongoose.Schema.Types.ObjectId],
    createDate : { type: Date, default: Date.now },
    modifiedDate : { type: Date, default: Date.now },
    version : Number,
    author : mongoose.Schema.Types.ObjectId
}));