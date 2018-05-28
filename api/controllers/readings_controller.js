'use strict';

var mongoose = require('mongoose');
var Leituras = require('../APPI/leituras');



exports.post_readings =  function(req, res){
    var newL = new Leituras({
      username: req.body.username,
          ritmo: req.body.ritmo,  
    pressao_art: req.body.pressao_art, 
    temp_pele: req.body.temp_pele,
    ph: req.body.ph,
    passos:req.body.passos,
      data_resg: Date.now(),
      notas: req.body.notas
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
};
exports.get_all_reads =  function(req, res) {
    Leituras.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_user_reads =  function(req, res) {
    Leituras.find({username: req.body.username},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.get_recent_read =  function(req, res) {
    Leituras.findOne().sort({"date_reg": -1}).exec(function(err, docs){
          if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.update_read= function(req, res) {
   
var id= req.param.id;
 
Leituras.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;
docs.ritmo= req.body.ritmo;
docs.pressao_art= req.body.pressao_art;
docs.temp_pele= req.body.temp_pele;
docs.ph= req.body.ph;
docs.passos= req.body.passos;
docs.data_resg= req.body.data_resg;
docs.notas= req.body.notas;
    
       
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
