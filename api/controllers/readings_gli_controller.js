'use strict';

var mongoose= require('mongoose');
var Leituras_gli= require('../APPI/leituras_gli');
var MP= require('../APPI/medic_pacients');
var Notificacoes= require('../APPI/notificacoes');



exports.create_readings_gli= function(req, res){
var newL= new Leituras_gli({
email:req.body.email,


glicemia: req.body.glicemia,  

//pacient
   
date_resg: Date.now(),
    
       
      });
      console.log("valor de glicemia inserido = " + req.body.glicemia);

    if(req.body.glicemia>=120){
var newN= new Notificacoes({
email:req.body.email,

pacient: req.body.pacient,
glicemia: req.body.glicemia,

aviso: 'Os niveis do paciente ' + req.body.pacient + ' estão acima do normal!' ,
nivel: 'Vermelho',  
date_resg: Date.now()


       
      });
   console.log(req.body.email);



    newN.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
       res.send('suc');}
    });
 
} 



    newL.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }else{
       res.send('sucesso');}
    });
    
    
    
 //   next();
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
    MP.find({medicEmail: req.body.medicEmail},function(err, docs){
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

exports.get_medic_reads_gli= function(req, res) {
Leituras_gli.find({medicEmail: req.body.medicEmail},function(err, docs){
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


