'use strict';

var mongoose= require('mongoose');
var Limites= require('../APPI/calculations');



exports.create_calcs= function(req, res){
var newL= new Limites({
patientID: req.body.patientID,
type:req.body.type,

value: req.body.value
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
res.json({msg: 'true'});
    });
};
exports.get_all_calcs= function(req, res) {
    Limites.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
   
      res.json(docs);
    });
};

exports.get_user_calcs= function(req, res) {
Limites.find({patientID: req.params.id},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      res.json(docs);
    });
};

exports.get_recent_calcs= function(req, res) {
Limites.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      res.json(docs);
    });
};

exports.update_calcs= function(req, res) {
   
var id= req.params.id;
 
Limites.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.patientID= req.body.patientID;
docs.type=req.body.type;

docs.value= req.body.value;

       
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

