'use strict';
var express = require('express');
var crypto = require("crypto");

var mongoose = require('mongoose');
var User = require('../APPI/user');
var Patients = require('../APPI/pacientes');
var passport = require("passport");



exports.register = function(req, res){
    
    var newUser= new User({
    username: req.body.username,
      
      //  email: req.body.email,
       
      });

    if(req.body.adminCode === 'admin') {
      newUser.isAdmin = true;
    }
       crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
         newUser.token= token;
         newUser.resetSessionExpires = Date.now() + 1800000;

    User.register(newUser, req.body.password, function(err, user){
        
      
        if(err){
            res.status(500).json({errors: [err]})
        }
       // passport.authenticate("local", "bearer")(req, res, function(){
           res.json('user registered'); 
   //     });
        
    });
    });
};


exports.get_all_users = function(req, res) {
   
       
    
    
    User.find(function(err, docs){
       if(err){
            console.log(err);
            
        }
      console.log(docs);
      res.json(docs);
    });
};


exports.get_user_profile= function(req, res) {
User.find({username: req.body.username},function(err, docs){
         if(err) {
            console.log(err);
            res.json({err});
        }
      console.log(docs);
      res.json(docs);
    });
};

exports.update_user= function(req, res) {
   
var id= req.param.id;
 
User.findOne({_id: id},function(err, docs){
    
         if(err) {
            console.log(err);
            res.json({err});
        }
        // res.send(docs);
        
docs.username= req.body.username;

docs.isAdmin= req.body.isAdmin;


       
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
exports.signUp= function(req, res) {
   
var id= req.body.username;
 
User.findOne({username: id},function(err, docs){
    
         if(err) {
            console.log(err);
            return res.json({err});
        }
        // res.send(docs);
        //////////////////
        if(!docs){ return res.json('not exist')}
        Patients.findOne({patientID:id},function(err, pat){
             
         if(err) {
            console.log(err);
            return res.json({err});
        }
      
        if(!pat){ return res.json('not exist')}
        if(!pat.Active){
            
                if(req.body.password === req.body.confirm) {
          docs.setPassword(req.body.password, function(err) {
              if(err){return err;}
              pat.Active = true;
                  pat.save(function(err) {
                              if(err){return err;}});
            docs.resetPasswordToken = undefined;
            docs.resetPasswordExpires = undefined;
            docs.firstLog = false;
            docs.save(function(err) {
                              if(err){return err;}

                
              req.logIn(docs, function(err) {
                                if(err){return err;}

                    // res.json(user);
                           
             res.status(200).json({msg:"true", user: req.user});   
              });
            });
          });
        } else {
            return res.json('back1');
          //  return res.redirect('back');
        }
        }else{
      return res.json('already exists');}
      
        });
        
        
        
        
        
  
        ////////
});
 };
 
 exports.update_password= function(req, res) {
   
var id= req.body.username;
 
User.findOne({username: id},function(err, docs){
    
         if(err) {
            console.log(err);
            return res.json({err});
        }
        // res.send(docs);
        //////////////////
        if(!docs){ return res.json('not exist')}
        Patients.findOne({patientID:id},function(err, pat){
             
         if(err) {
            console.log(err);
            return res.json({err});
        }
      
        if(!pat){ return res.json('not exist')}
        if(pat.Active){
            
                if(req.body.password === req.body.confirm) {
          docs.setPassword(req.body.password, function(err) {
              if(err){return err;}
             
            docs.resetPasswordToken = undefined;
            docs.resetPasswordExpires = undefined;
            docs.save(function(err) {
                              if(err){return err;}

                
              req.logIn(docs, function(err) {
                                if(err){return err;}

                    // res.json(user);
                           
             res.status(200).json({msg:"true", user: req.user});   
              });
            });
          });
        } else {
            return res.json('back1');
          //  return res.redirect('back');
        }
        }else{
      return res.json('already exists');}
      
        });
        
        
        
        
        
  
        ////////
});
 };
 
 
