var mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({

    username: String,
    description: String,
    
});


 module.exports = mongoose.model('tasks', tasksSchema);

    