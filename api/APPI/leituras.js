var mongoose = require('mongoose');

var leiturasSchema = new mongoose.Schema({


    email: String,
    ritmo: Number,  
    pressao_art: Number, 
    temp_pele: Number,
    ph: Number,
    passos:Number,
      data_resg: Date,
      notas: String
});


 module.exports = mongoose.model('leituras', leiturasSchema);

    