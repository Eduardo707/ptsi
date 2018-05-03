var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leituras = require('./APPI/leituras');
/*var Leituras_gli = require('./APPI/leituras_gli');
var Medicos = require('./APPI/medicos');
var Notificacoes = require('./APPI/notificacoes');
var Pacientes = require('./APPI/pacientes');
var User = require('./APPI/user');*/
var passport = require("passport");
var app = express.Router();
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var crypto = require("crypto");
var async = require("async");
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var client = require("twilio")


app.get("/leituras", function(req, res){
    
   res.render("leituras", {page: 'leituras'}); 

});


/*app.get('/get/all', function(req, res) {
    Leituras.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});*/

app.get("/leituras", function(req, res) {
    Leituras.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

/*
app.post("/leituras", function(req, res){
    var newL = new Leituras({
          ritmo: req.body.ritmo,  
    pressao_art: req.body.pressao_art, 
    temp_pele: req.body.temp_pele,
    ph: req.body.ph,
    passos:req.body.passos,
      data_resg: req.body.data_resg,
      notas: req.body.notas
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
});*/



