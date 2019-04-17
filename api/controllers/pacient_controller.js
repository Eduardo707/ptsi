'use strict';

var crypto = require("crypto");

var mongoose = require('mongoose');
var User = require('../APPI/user');
var Pacientes= require('../APPI/pacientes');



exports.create_pacients= function(req, res){
var newP= new Pacientes({

nome:req.body.nome,  
num_tel: req.body.num_tel, 
patientID: req.body.patientID,
sns:req.body.sns,
data_nasc: req.body.date_nasc,
    leituras: req.body.leituras
       
      }); 
     // newP.leituras.push(req.body.leituras);



    var newUser = new User({
        username: req.body.patientID,
      
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
    
Pacientes.findOne({patientID: mail},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      console.log(req.body.patientID);
      res.json(docs);
    });
};

exports.get_user_pacients2= function(req, res) {
    
 
 var us= req.params.patientID;

Pacientes.findOne({patientID: us},function(err, docs){
    
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

    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        if( req.body.patientID){
            docs.patientID= req.body.patientID;
        }else {docs.patientID = docs.patientID}
        
       
        
          if( req.body.nome){
              console.log(req.body.nome);
            docs.nome= req.body.nome;
        }
        
          if( req.body.num_tel){
              console.log(docs.num_tel + '     1');
            docs.num_tel= req.body.num_tel;
             console.log(docs.num_tel + '     2');
        } 
        

        
       
        
        if( req.body.date){
            docs.date_nasc= req.body.date;
        } 
        
        if( req.body.sns){
            docs.sns= req.body.sns;
        }
        
        if( req.body.Active ){
            docs.Active= req.body.Active;
        }
    

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


