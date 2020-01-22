'use strict';

var mongoose= require('mongoose');
var Limites= require('../APPI/limites');



exports.create_limits= function(req, res){
var newL= new Limites({
patientID: req.body.patientID,
type:req.body.type,

inf: req.body.inf,  

sup: req.body.sup
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
res.json({msg: 'true'});
    });
};
exports.get_all_limits= function(req, res) {
    Limites.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_limits= function(req, res) {
Limites.find({patientID: req.params.id},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_recent_limits= function(req, res) {
Limites.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.update_limits= function(req, res) {
   
var id= req.params.id;
 
Limites.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.patientID= req.body.patientID;
docs.type=req.body.type;

docs.inf= req.body.inf;
docs.sup= req.body.sup;

       
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

