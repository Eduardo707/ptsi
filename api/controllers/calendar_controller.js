'use strict';

var mongoose= require('mongoose');
var Calendar= require('../APPI/calendar');




exports.create_calendar= function(req, res){
    

    
var newC= new Calendar({


 username: 'edumf7@hotmail.com',
    title: 'tito',
     start_date: Date.now(),
    due_date: Date.now(),  
    assigned_to: 'Luisa', 
    description: 'Diabetes fora do controlo, causa bolo cheio de gomas'

       
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


