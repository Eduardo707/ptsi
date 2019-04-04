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
    
 
 var us= req.body.email;

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
   
var id= req.param.id;
 
Pacientes.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        if(!req.body.email==null){
            docs.email= req.body.email;
        }
          if(!req.body.medicEmail==null){
            docs.email= req.body.medicEmail;
        }
          if(!req.body.nome==null){
            docs.email= req.body.nome;
        }
          if(!req.body.num_tel==null){
            docs.email= req.body.num_tel;
        } 
        if(!req.body.morada==null){
            docs.email= req.body.morada;
        } 
        if(!req.body.utente==null){
            docs.email= req.body.utente;
        }
        if(!req.body.date==null){
            docs.email= req.body.date;
        }  
        if(!req.body.beneficiario==null){
            docs.email= req.body.beneficiario;
        }
        if(!req.body.app==null){
            docs.email= req.body.app;
        }


       
     docs.save(function(err, docs) {
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log('y');
      res.send(docs);
      
 

    });
});
 };


