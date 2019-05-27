var mongoose = require('mongoose');

var leiturasSchema = new mongoose.Schema({


    patientID: String,
  
    type: String,  
    value: Number,
      data_resg: {type: Date, unique: true, required: true},
      notas: String
});


 module.exports = mongoose.model('leituras', leiturasSchema);

    