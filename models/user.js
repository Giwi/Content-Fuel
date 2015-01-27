var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Role = require('../models/role');
var userSchema = mongoose.Schema({
    roles: [Role],
    spaces: [mongoose.Schema.Types.ObjectId],
    admin: Boolean,
    createDate: {type: Date, default: Date.now},
    token: String,
    firstname: String,
    name: String,
    email: String,
    password: String,
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

