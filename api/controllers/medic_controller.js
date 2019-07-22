'use strict';

var mongoose= require('mongoose');
var Medicos= require('../APPI/medicos');
var Pacientes= require('../APPI/pacientes');



exports.create_medics= function(req, res){
    


var newM= new Medicos({

nome: req.body.nome,
//req.body.nome,  
medicID: req.body.medicID,

//req.body.cedula,
Active: req.body.Active

    
       
      });
newM.lista_pacientes.push({id_paciente: req.body.id, nome_paciente: req.body.nome})


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
Medicos.find({medicID: req.body.medicID},function(err, docs){
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
        
docs.medicID= req.body.medicID;
docs.nome= req.body.nome;
docs.Active= req.body.Active;
docs.lista_pacientes.push({patientID: req.body.patientID,nome_paciente: req.body.nome_paciente});
    /*--------------------------------------------------------------------------------
   // 
--------------------------------------------------------------------------*/
       
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


