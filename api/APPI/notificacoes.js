var mongoose = require('mongoose');

var notificacoesSchema = new mongoose.Schema({
    
     username: String,
    paciente: String,
    medicEmail:String,

 aviso: Number,
    nivel: Number 
  
      
    
});


 module.exports = mongoose.model('paciente',  notificacoesSchema);

    