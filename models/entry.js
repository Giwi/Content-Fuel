var mongoose = require('mongoose');

module.exports = mongoose.model('Entry', mongoose.Schema({
    status: Schema.Types.ObjectId,
    entryModel: Schema.Types.ObjectId,
    content  : [Schema.Types.ObjectId],
    createDate : { type: Date, default: Date.now },
    modifiedDate : { type: Date, default: Date.now },
    version : Number,
    author : Schema.Types.ObjectId,
    pubDate :{ type: Date, default: Date.now },
    pubAuthor : Schema.Types.ObjectId
}));