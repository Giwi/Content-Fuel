var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Locale = require('./locale');
var Webhook = require('./webhook');
var Role = require('./role');

var space = mongoose.Schema({
    name: String,
    owner : mongoose.Schema.Types.ObjectId,
    locales : { type: [Locale], default : []},
    webhooks : { type:[Webhook], default : []},
    roles :{ type: [Role], default : []},
    createDate: {type: Date, default: Date.now},
    description : String,
    entries : { type:[mongoose.Schema.Types.ObjectId], default : []},
    folder :{ type: [mongoose.Schema.Types.ObjectId], default : []},
    contributors :{ type:[mongoose.Schema.Types.ObjectId], default : []}
});
space.methods.generateHash = function(name) {
    return bcrypt.hashSync(name, bcrypt.genSaltSync(8), null);
};
module.exports = mongoose.model('Space', space);