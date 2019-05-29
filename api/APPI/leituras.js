var mongoose = require('mongoose');

var leiturasSchema = new mongoose.Schema({


    patientID: {type: String, unique: false, required: true},
        data_resg: {type: Date, unique: true, required: true},

    type: String,  
    value: Number,
      notas: String
});


 module.exports = mongoose.model('leituras', leiturasSchema);

    