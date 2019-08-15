'use strict';

var mongoose= require('mongoose');
var Tasks= require('../APPI/tasks');
    require('dotenv').config();




exports.create_tasks= function(req, res){
    

    
var newC= new Tasks({


    username: req.body.username,
    description: req.body.description

       
      });

             
             
    newC.save(function(err){
        if(err){
            console.log(err);
            
        }
       
       res.send("sucesso");
    });
 };
    



exports.get_all_tasks= function(req, res) {
    Tasks.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_tasks= function(req, res) {
Tasks.find({username: req.body.username},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

/*exports.get_recent_medics= function(req, res) {
Medicos.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};*/


exports.update_tasks= function(req, res) {
   
var id= req.params.id;
 
Tasks.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;
docs.description= req.body.description;


    /*--------------------------------------------------------------------------------
   // docs.lista_pacientes.push({id_paciente:"54",nome_paciente: "dfs"});
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


