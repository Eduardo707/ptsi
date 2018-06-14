var mongoose = require('mongoose');

var pacientesSchema = new mongoose.Schema({
    
     email: String,
     limites:String,
    tipo_leit: String,
 limit_inf: Number,
    limit_sup: Number, 

     
      
    
});


 module.exports = mongoose.model('limites', pacientesSchema);

    