var express = require('express');


var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var Login = require("./APPI/login");

var app = express();

mongoose.connect('mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n');

var db = mongoose.connection;
console.log(db);



app.get('/api/logins', function(req, res){
  res.send('Please work :(');
});

/*app.get('/api/logins', function(req, res){
    
});*/
app.listen(process.env.PORT);
console.log('run');
