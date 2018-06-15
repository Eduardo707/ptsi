var mongoose = require('mongoose');

var medicosSchema = new mongoose.Schema({
    
     username: String,
    nome: String,
 num_tel: Number,
    especialidade: String, 
    morada: String,  
    email:  String,
    cedula: String,
    data_nasc: Date,
    data_acesso: Date,
     
      notas: String
    
});


 module.exports = mongoose.model('medicos', medicosSchema);

    