var mongoose = require('mongoose');

var medic_pacientSchema = new mongoose.Schema({
    
     medic_email: {type: String, unique: true, required: true},
    pacient_email: {type: String, unique: true, required: true},

    
});


 module.exports = mongoose.model('medic_pacient', medic_pacientSchema);

    