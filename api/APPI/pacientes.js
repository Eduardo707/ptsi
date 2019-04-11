var mongoose = require('mongoose');

var pacientesSchema = new mongoose.Schema({
    
     patientID: String,
    // medicEmail:String,
    nome: String,
 num_tel: Number,

 leituras: [String],
 
    
    data_nasc: Date,
    sns: Number,
    Active: {type:Boolean, default: false}
     
      
    
});


 module.exports = mongoose.model('pacientes', pacientesSchema);

    