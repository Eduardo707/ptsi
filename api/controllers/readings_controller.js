'use strict';

var mongoose = require('mongoose');
var Leituras = require('../APPI/leituras');



exports.post_readings =  function(req, res){
    var newL = new Leituras({
      patientID: decodeURIComponent(req.body.patientID),
      type:req.body.type,

    value: req.body.value,  

      data_resg: req.body.data_resg,
      notas: req.body.notas
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.json({msg: 'true'});
    });
};
exports.get_all_reads =  function(req, res) {
    Leituras.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
   //   console.log(docs);
      res.json(docs);
    });
};

exports.get_user_reads =  function(req, res) {
    Leituras.find({patientID: req.body.patientID},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
    //  console.log(docs);
      res.json(docs);
    });
};
exports.get_user_reads2 =  function(req, res) {
    Leituras.find({patientID: req.params.id}).sort({"data_resg": +1}).exec(function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
    //  console.log(docs);
      res.json(docs);
    });
};
exports.get_user_gli_reads =  function(req, res) {
    Leituras.find({patientID: req.body.patientID, type: "glicemia"}).sort({"data_resg": +1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
    //  console.log(docs);
      res.json(docs);
    });
};

exports.get_user_bat_reads =  function(req, res) {
    Leituras.find({patientID: req.body.patientID, type: "batimentos"},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
   //   console.log(docs);
      res.json(docs);
    });
};
exports.get_user_gli_reads_params =  function(req, res) {
    Leituras.findOne({patientID: req.params.id, type: "glicemia"}).sort({"data_resg": +1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
    //  console.log(docs);
      res.json(docs);
    });
};

exports.get_recent_read =  function(req, res) {
    Leituras.findOne().sort({"data_resg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
     // console.log(docs);
      res.json(docs);
    });
};

exports.update_read= function(req, res) {
   
var id= req.params.id;
 
Leituras.findOne({data_resg: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
/*docs.patientID= req.body.patientID;
docs.type=req.body.type;

docs.value= req.body.value;
docs.data_resg= req.body.data_resg;*/
docs.notas= req.body.notas;
    
       
     docs.save(function(err, docs) {
        if(err) {
            console.log(err);
            res.json({err});
        }
  //    console.log('y');
      res.json(docs);
      
 

    });
});
 };
