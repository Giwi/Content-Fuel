var mongoose = require('mongoose');

module.exports = mongoose.model('Content', mongoose.Schema({
    fields : [Schema.Types.ObjectId],
    locale : Schema.Types.ObjectId
}));


