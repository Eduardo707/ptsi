var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({

    username: String,
    title: String,
     start_date: Date,
    due_date: Date,  
    assigned_to: String, 
    description: String,
    
});


 module.exports = mongoose.model('calendar', calendarSchema);

    