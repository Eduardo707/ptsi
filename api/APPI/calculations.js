var mongoose= require('mongoose');

var calculationsSchema= new mongoose.Schema({
    
patientID: String,
type: String,
    
value: Number

     
      
    
});


module.exports= mongoose.model('calculations', calculationsSchema);

    
