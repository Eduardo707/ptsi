'use strict';

var mongoose = require('mongoose');
var Rawdata = require('../APPI/rawdata');



exports.post_rawdata =  function(req, res){
    var newR = new Rawdata({
      rawID: req.body.rawID,
      data:req.body.data


       
      });



    newR.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.json({msg: 'true'});
    });
};

exports.get_user_data =  function(req, res) {
    Rawdata.find({tagID: req.params.id},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

 
