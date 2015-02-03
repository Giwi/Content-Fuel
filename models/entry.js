var mongoose = require('mongoose');

module.exports = mongoose.model('Entry', mongoose.Schema({
    name : String,
    status: mongoose.Schema.Types.ObjectId,
    entryModel: mongoose.Schema.Types.ObjectId,
    content  : [mongoose.Schema.Types.ObjectId],
    createDate : { type: Date, default: Date.now },
    modifiedDate : { type: Date, default: Date.now },
    version : Number,
    author : mongoose.Schema.Types.ObjectId,
    pubDate :{ type: Date, default: Date.now },
    pubAuthor : mongoose.Schema.Types.ObjectId
}));