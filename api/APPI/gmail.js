var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");


var gmailSchema = new mongoose.Schema({
    
     mail: String,
    pass: String

    
});

gmailSchema.plugin(passportLocalMongoose);


 module.exports = mongoose.model('gmails', gmailSchema);

    