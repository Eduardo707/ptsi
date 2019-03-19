var mongoose = require('mongoose');



var chatSchema = new mongoose.Schema({
    
    
    medic_username: {type:String, unique: true},

 patient_username:{type:String, unique: true},
  
      
     msg:  [{_id: false,name: String, text: String}]
    
});


 module.exports = mongoose.model('chat', chatSchema);

    