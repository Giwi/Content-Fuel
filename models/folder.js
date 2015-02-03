var mongoose = require('mongoose');

module.exports = mongoose.model('Folder', mongoose.Schema({
    name: String,
    entries : [mongoose.Schema.Types.ObjectId],
    folder : [mongoose.Schema.Types.ObjectId]
}));