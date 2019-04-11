var mongoose = require('mongoose');

var Pacientes= require('../APPI/pacientes');


var medicosSchema = new mongoose.Schema({
    
    

   medicID:  {type: String, unique: true, required: true},
   nome: String,
   Active:  {type: Boolean, required: true},
      
      lista_pacientes:  [{_id: false,patientID: String, nome_paciente: String}]
    
});


 module.exports = mongoose.model('medicos', medicosSchema);

    