var mongoose = require('mongoose');

var notificacoesSchema = new mongoose.Schema({
    
    
    medic_username: String,

 patient_username:{type:String, unique: true},
  
      
     msg:  [{_id: false,name: String, text: String, date: Date, is_seen: {type:Boolean, default: false}}]
});


 module.exports = mongoose.model('notificacoes',  notificacoesSchema);

    