var mongoose = require('mongoose');



var chatSchema = new mongoose.Schema({
    
    
    medic_username: String,

 patient_username:{type:String, unique: true},
  
      
     msg:  [{_id: false,name: String, text: String, date: Date, notification: true}]
    
});


 module.exports = mongoose.model('chat', chatSchema);

    