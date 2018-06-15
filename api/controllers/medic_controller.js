'use strict';

var mongoose= require('mongoose');
var Medicos= require('../APPI/medicos');



exports.create_medics= function(req, res){
var newM= new Medicos({
username: req.body.username,
nome: req.body.nome,  
num_tel: req.body.num_tel, 
morada: req.body.morada,
email: req.body.email,
especialidade:req.body.especialidade,
data_nasc: Date.now(),
cedula: req.body.cedula,
data_acesso: req.body.data_acesso
    
       
      });



    newM.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
};
exports.get_all_medics= function(req, res) {
    Medicos.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_medics= function(req, res) {
Medicos.find({email: req.body.email},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_recent_medics= function(req, res) {
Medicos.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.update_medics= function(req, res) {
   
var id= req.param.id;
 
Medicos.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;
docs.nome= req.body.nome;
docs.num_tel= req.body.num_tel;
docs.morada= req.body.morada;
docs.email= req.body.email;
docs.especialidade=req.body.especialidade;
docs.data_nasc= req.body.date;
docs.cedula= req.body.cedula;
docs.data_acesso= req.body.data_acesso;

    
       
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


