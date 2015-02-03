var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Locale = require('./locale');
var Webhook = require('./webhook');
var Role = require('./role');
var Entry = require('./entry');
var Folder = require('./folder');

var space = mongoose.Schema({
    name: String,
    owner :  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    locales : { type: [Locale], default : []},
    webhooks : { type:[Webhook], default : []},
    roles :{ type: [Role], default : []},
    createDate: {type: Date, default: Date.now},
    description : String,
    entries : [{ type:mongoose.Schema.Types.ObjectId,  ref : 'Entry'}],
    folder : [{type: mongoose.Schema.Types.ObjectId, ref : 'Folder'}],
    contributors :[{ type:mongoose.Schema.Types.ObjectId,  ref: 'User'}]
});
space.methods.generateHash = function(name) {
    return bcrypt.hashSync(name, bcrypt.genSaltSync(8), null);
};
module.exports = mongoose.model('Space', space);