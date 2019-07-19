var mongoose = require('mongoose');

var rawdataSchema = new mongoose.Schema({


    tagId: {type: String,  required: true},
        data: {type: String,required: true},

});


 module.exports = mongoose.model('rawdata', rawdataSchema);

    