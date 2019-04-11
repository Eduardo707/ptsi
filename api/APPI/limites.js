var mongoose= require('mongoose');

var pacientesSchema= new mongoose.Schema({
    
patientID: String,
type: String,
    
inf: Number,
sup: Number, 

     
      
    
});


module.exports= mongoose.model('limites', pacientesSchema);

    
