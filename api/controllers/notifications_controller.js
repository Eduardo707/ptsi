'use strict';

var mongoose= require('mongoose');
var Notificacoes= require('../APPI/notificacoes');



exports.create_notifs= function(req, res){
var newN= new Notificacoes({
username: req.body.username,
paciente: req.body.paciente,  
aviso: req.body.aviso, 
nivel: req.body.nivel
       
      });



    newN.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
};
exports.get_all_notifs= function(req, res) {
    Notificacoes.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_notifs= function(req, res) {
Notificacoes.find({username: req.body.username},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_recent_notifs= function(req, res) {
Notificacoes.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.update_notifs= function(req, res) {
   
var id= req.param.id;
 
Notificacoes.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;
docs.paciente= req.body.paciente;
docs.aviso= req.body.aviso;
docs.nivel= req.body.nivel;


       
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



