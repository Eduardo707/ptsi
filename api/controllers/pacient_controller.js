'use strict';

var crypto = require("crypto");

var mongoose = require('mongoose');
var User = require('../APPI/user');
var Pacientes= require('../APPI/pacientes');



exports.create_pacients= function(req, res){
var newP= new Pacientes({

nome:req.body.nome,  
num_tel: req.body.num_tel, 
//medicEmail: req.body.medicEmail,
morada:req.body.morada,
email: req.body.email,
utente:req.body.utente,
data_nasc: Date.now(),
beneficiario: req.body.beneficiario,
app: req.body.app
    
       
      });


    var newUser = new User({
        username: req.body.email,
      
     //   email: req.body.email,
       
      });

    if(req.body.adminCode === 'admin') {
      newUser.isAdmin = true;
    }
       crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
         newUser.token= token;
         newUser.resetSessionExpires = Date.now() + 1800000;

    User.register(newUser, req.body.password, function(err, user){
        
      
        if(err){
            res.status(500).json({errors: [err]})
        }
       // passport.authenticate("local", "bearer")(req, res, function(){
           res.json('user registered'); 
   //     });
        
    });
    });
    newP.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.json("sucesso");
    });
};
exports.get_all_pacients= function(req, res) {
    Pacientes.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_pacients= function(req, res) {
    
    //var mail = decodeURIComponent(req.body.email);
    console.log("body " + req.body)
    var mail = unescape(req.body.username);
    console.log(mail);
    
Pacientes.findOne({email: mail},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      console.log(req.body.email);
      res.json(docs);
    });
};

exports.get_user_pacients2= function(req, res) {
    
 
 var us= req.params.email;

Pacientes.findOne({email: us},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }

      res.json(docs);
    });
};
exports.get_recent_pacients= function(req, res) {
Pacientes.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.update_pacients= function(req, res) {
   
var id= req.params.id;
 
Pacientes.findOne({_id: id},function(err, docs){
    console.log( docs + "docs-----");
    console.log("++++++" + req.body.medicEmail);
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        if(typeof req.body.email === 'undifined'){
            docs.email= req.body.email;
        }else {docs.email = docs.email}
        
          if(typeof req.body.medicEmail === 'undefined'){
            docs.medicEmail= req.body.medicEmail;
        }else {docs.medicEmail = docs.medicEmail}
        
          if(typeof req.body.nome === 'undefined'){
              console.log(req.body.nome);
            docs.nome= req.body.nome;
        }else {docs.nome = docs.nome}
        
          if(typeof req.body.num_tel === 'undefined'){
            docs.num_tel= req.body.num_tel;
        } else {docs.num_tel = docs.num_tel}
        
        if(typeof req.body.morada === 'undefined'){
            docs.morada= req.body.morada;
        } else {docs.morada = docs.morada}
        
        if(typeof req.body.utente === 'undefined'){
            docs.utente= req.body.utente;
        }else {docs.utente = docs.utente}
        
        if(typeof req.body.date === 'undefined'){
            docs.date= req.body.date;
        }  else {docs.date = docs.date}
        
        if(typeof req.body.beneficiario === 'undefined'){
            docs.beneficiario= req.body.beneficiario;
        }else {docs.beneficiario = docs.beneficiario}
        
        if(typeof req.body.app === 'undefined'){
            docs.app= req.body.app;
        }else {docs.app = docs.app}
    

       console.log(docs);
    docs.save(function(err, docs) {
        if(err) {
            console.log(err);
            res.json({err});
        } else{
      console.log('y');
      res.send(docs);}
      
 

    });
});
 };


