var mongoose= require('mongoose');

var limitesSchema= new mongoose.Schema({
    
patientID: String,
type: String,
    
inf: Number,
sup: Number

     
      
    
});


module.exports= mongoose.model('limites', limitesSchema);

    
