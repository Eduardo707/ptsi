var mongoose = require('mongoose');

var pacientesSchema = new mongoose.Schema({
    
     email: String,
     medicEmail:String,
    nome: String,
 num_tel: Number,
    especialidade: String, 
    morada: String,  
    mail:  String,
    utente: Number,
    data_nasc: Date,
    beneficiario: Number,
    app: {type:Boolean, default: false}
     
      
    
});


 module.exports = mongoose.model('pacientes', pacientesSchema);

    