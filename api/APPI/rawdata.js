var mongoose = require('mongoose');

var rawdataSchema = new mongoose.Schema({

    patientID :  {type: String,  required: true},
    tagID: String,
        data: String

});


 module.exports = mongoose.model('rawdata', rawdataSchema);

    