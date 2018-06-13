'use strict';

var mongoose= require('mongoose');
var Leituras_gli= require('../APPI/leituras_gli');
var MP= require('../APPI/medic_pacients');


exports.create_readings_gli= function(req, res){
var newL= new Leituras_gli({
email: req.body.email,
medicEmail:req.body.medicEmail,

glicemia: req.body.glicemia,  

   
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
var merge = function() {
var destination = {},
    sources = [].slice.call( arguments, 0 );
sources.forEach(function( source ) {
    var prop;
    for ( prop in source ) {
        if ( prop in destination && Array.isArray( destination[ prop ] ) ) {

            // Concat Arrays
            destination[ prop ] = destination[ prop ].concat( source[ prop ] );

        } else if ( prop in destination && typeof destination[ prop ] === "object" ) {

            // Merge Objects
            destination[ prop ] = merge( destination[ prop ], source[ prop ] );

        } else {

            // Set new values
            destination[ prop ] = source[ prop ];

        }
    }
});
return destination;
};
exports.get_ll_reads_gli= function(req, res) {
    MP.find({medicEmail: 'edumf7@gmail.com'},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
       
      var keys = Object.keys(docs);
     // console.log(keys);
     
     
      var result;
      
     
for (var i = 0; i < keys.length; i++) {
    
 // console.log(docs[keys[i]].pacientEmail);
var em = docs[keys[i]].pacientEmail
    //  res.json(docs);
   
    
    Leituras_gli.find({email: em},function(err, docs1){
        if(err) {
            console.log(err);
            res.json({err});
        }
    //  console.log(docs);
    //  res.json(JSON.parse(docs));
   // console.log('/////////////'+docs);
     // var newStr = docs.substring(1, docs .length-1);
//console.log(newStr);
     if(i==0){result= docs1;}
      else{ result = merge(result,docs1);
          
          res.json(result);
      }
         
         
         
         
         

    
   

     
    });
    
   
    
      
    
} console.log(JSON.stringify(result));
 });};




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
        docs.medicEmail=req.body.medicEmail;

docs.glicemia= req.body.glicemia;
docs.date_reg= req.body.date_reg;
       
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


