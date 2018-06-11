var mongoose = require('mongoose');

var medic_pacientsSchema = new mongoose.Schema({
    
     medicEmail: {type: String, unique: false, required: true},
    pacientEmail: {type: String, unique: false, required: true},

    
});


 module.exports = mongoose.model('medic_pacients', medic_pacientsSchema);

    