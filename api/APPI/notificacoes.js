var mongoose = require('mongoose');

var notificacoesSchema = new mongoose.Schema({
    
    
    medic_username: String,

 patient_username:{type:String, unique: true},
  
      
     msg:  [{name: String, text: String, date: Date, is_seen: {type:Boolean, default: false},notification: {type:Boolean, default: true}}]
});


 module.exports = mongoose.model('notificacoes',  notificacoesSchema);

    