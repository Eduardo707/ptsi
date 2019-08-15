var mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({

    username: String,
    details: String,
    
});


 module.exports = mongoose.model('tasks', tasksSchema);

    