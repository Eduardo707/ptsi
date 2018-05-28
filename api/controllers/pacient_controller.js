'use strict';

var mongoose= require('mongoose');
var Pacientes= require('../APPI/pacientes');



exports.create_pacients= function(req, res){
var newP= new Pacientes({
username: req.body.username,
nome: req.body.nome,  
num_tel: req.body.num_tel, 
morada: req.body.morada,
mail: req.body.mail,
utente:req.body.utente,
data_nasc: Date.now(),
beneficiario: req.body.beneficiario,
app: req.body.app
    
       
      });



    newP.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
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
Pacientes.find({username: req.body.username},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
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
        
docs.username= req.body.username;
docs.nome= req.body.nome;
docs.num_tel= req.body.num_tel;
docs.morada= req.body.morada;
docs.mail= req.body.mail;
docs.utente=req.body.utente;
docs.data_nasc= req.body.date;
docs.beneficiario= req.body.beneficiario;
docs.app= req.body.app;

       
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


