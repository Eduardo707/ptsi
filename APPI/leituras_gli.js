var mongoose = require('mongoose');

var leituras_gliSchema = new mongoose.Schema({
    
     username: String,
    glicemia: Number,
 glicemia_a: Number,
    glicemia_p: Number,
    date_reg: Date

    
});


 module.exports = mongoose.model('leituras_gli', leituras_gliSchema);

    