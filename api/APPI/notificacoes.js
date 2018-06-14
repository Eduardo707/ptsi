var mongoose = require('mongoose');

var notificacoesSchema = new mongoose.Schema({
    
     email: String,
    pacient: String,
    medicEmail:String,
glicemia: Number,
 aviso: String,
    nivel: String,
    date_resg: Date
  
      
    
});


 module.exports = mongoose.model('notificacoes',  notificacoesSchema);

    