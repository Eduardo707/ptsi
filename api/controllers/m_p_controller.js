'use strict';
var express = require('express');
var mongoose= require('mongoose');
var MP= require('../APPI/medic_pacients');



exports.create_m_p = function(req, res){
var newMP= new MP({
medicEmail: req.body.medicEmail,
pacientEmail: req.body.pacientEmail

       
      });




    newMP.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
};



exports.get_all_m_p= function(req, res) {
    MP.find(function(err, docs){
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.get_medic_p= function(req, res) {
MP.find({medicEmail: "edumf7@gmail.com"},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};
