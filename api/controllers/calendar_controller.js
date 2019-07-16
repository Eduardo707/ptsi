'use strict';

var mongoose= require('mongoose');
var Calendar= require('../APPI/calendar');
    require('dotenv').config();




exports.create_calendar= function(req, res){
    

    
var newC= new Calendar({


 username: req.body.username,
    title: req.body.title,
     start_date: req.body.start_date,
    due_date: req.body.due_date,  
    assigned_to: req.body.assigned_to, 
    description: req.body.description

       
      });

             
             
    newC.save(function(err){
        if(err){
            console.log(err);
            
        }
       
       res.send("sucesso");
    });
 };
    



exports.get_all_calendar= function(req, res) {
    Calendar.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_calendar= function(req, res) {
Calendar.find({username: req.body.username},function(err, docs){
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


exports.update_calendar= function(req, res) {
   
var id= req.param.id;
 
Calendar.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;
docs.title= req.body.title;
docs.start_date= req.body.start_date;
docs.due_date=req.body.due_date;
docs.assigned_to= req.body.assigned_to; 
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


