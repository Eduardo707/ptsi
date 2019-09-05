'use strict';

var mongoose= require('mongoose');
var Medicos= require('../APPI/medicos');
var Pacientes= require('../APPI/pacientes');
var Chat= require('../APPI/chat');



exports.create_medics= function(req, res){
    


var newM= new Medicos({

nome: req.body.nome,
//req.body.nome,  
medicID: req.body.medicID,

//req.body.cedula,
Active: req.body.Active

    
       
      });
newM.lista_pacientes.push({patientID: req.body.id, nome_paciente: req.body.nome_paciente})





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
   
var id= req.params.id;
 
Medicos.findOne({medicID: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.medicID= req.body.medicID;
docs.nome= req.body.nome;
//docs.Active= req.body.Active;
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
exports.update_lists= function(req, res) {
   
var id= req.params.id;
 
Medicos.findOne({medicID: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        

docs.lista_pacientes.push({patientID: req.body.patientID,nome_paciente: req.body.nome_paciente});



var newC = new Chat({
      medic_username: id,
    patient_username: req.body.patientID
 
    
    
});

  newC.save(function(err){
        if(err){
            console.log(err);
            
        }else{
       res.json({msg:"sucesso"});}
    });


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


