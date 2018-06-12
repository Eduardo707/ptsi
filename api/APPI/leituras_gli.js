var mongoose = require('mongoose');

var leituras_gliSchema = new mongoose.Schema({
    
     email: String,
      medicEmail:String,
    glicemia: Number,
 glicemia_a: Number,
    glicemia_p: Number,
    date_resg: Date

    
});


 module.exports = mongoose.model('leituras_glis', leituras_gliSchema);

    