var mongoose = require('mongoose');

module.exports = mongoose.model('Folder', mongoose.Schema({
    name: String,
    entries : [Schema.Types.ObjectId],
    folder : [Schema.Types.ObjectId]
}));