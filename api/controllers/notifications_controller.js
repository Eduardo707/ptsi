'use strict';

var mongoose= require('mongoose');
var Notificacoes= require('../APPI/notificacoes');



exports.create_notifs= function(req, res){   
    if(req.body.glicemia>=120){
var newN= new Notificacoes({
email:req.body.email,
pacient: req.body.pacient,
glicemia: req.body.glicemia,

aviso: 'Os niveis do paciente ' + req.body.pacient + ' estão acima do normal!' ,
nivel: 'Vermelho',  
date_resg: Date.now()


       
      });
   console.log(req.body.email);



    newN.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
       res.send('suc');}
    });
 
} 
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

exports.get_user_pat= function(req, res) {
Notificacoes.find({patient_username: req.params.id},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};
exports.get_user_notifs= function(req, res) {
Notificacoes.find({email: req.body.email},function(err, docs){
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
        
docs.email= req.body.email;
docs.medicEmail = req.body.medicEmail;
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



