'use strict';

var mongoose= require('mongoose');
var Leituras_gli= require('../APPI/leituras_gli');



exports.create_readings_gli= function(req, res){
var newL= new Leituras_gli({
email: req.body.email,
glicemia: req.body.glicemia,  
glicemia_a: req.body.glicemia_a, 
glicemia_p: req.body.glicemia_p,
   
data_resg: Date.now(),
    
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
       res.send("sucesso");}
    });
};
exports.get_all_reads_gli= function(req, res) {
    Leituras_gli.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_reads_gli= function(req, res) {
Leituras_gli.find({email: req.body.email},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.get_recent_read_gli= function(req, res) {
Leituras_gli.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.update_read_gli= function(req, res) {
   
var id= req.param.id;
 
Leituras_gli.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.glicemia= req.body.glicemia;
docs.glicemia_p= req.body.glicemia_p;
docs.glicemia_a= req.body.glicemia_a;
       
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


