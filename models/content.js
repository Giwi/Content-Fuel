var mongoose = require('mongoose');

module.exports = mongoose.model('Content', mongoose.Schema({
    fields : [mongoose.Schema.Types.ObjectId],
    locale : mongoose.Schema.Types.ObjectId
}));


