'use strict';

var mongoose= require('mongoose');
var MP= require('../APPI/medic_pacient');



exports.create_m_p= function(req, res){
var newMP= new MP({
medic_email: req.body.medic_email,
pacient_email: req.body.pacient_email,  

       
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


exports.get_m_p= function(req, res) {
MP.find({medic_email: req.param.medic_email},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};
