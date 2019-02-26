var mongoose = require('mongoose');

var Pacientes= require('../APPI/pacientes');


var medicosSchema = new mongoose.Schema({
    
    
    nome: String,
 num_tel: Number,
    especialidade: String, 
    morada: String,  
    email:  {type: String, unique: true, required: true},
    cedula: String,
    data_nasc: Date,

      notas: String,
      
      lista_pacientes:  [{_id: false,id_paciente: String, nome_paciente: String}]
    
});


 module.exports = mongoose.model('medicos', medicosSchema);

    