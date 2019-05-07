var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
 
    username: {type: String, unique: true, required: true},
    password: String,
    
   // email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false},
    firstLog: {type: Boolean, default: true},
    token: {type: String, unique: false, require: false},
    resetSessionExpires:  Date
});

userSchema.plugin(passportLocalMongoose);


 module.exports = mongoose.model('users', userSchema);

    
