'use strict';
var express = require('express');
var crypto = require("crypto");

var mongoose = require('mongoose');
var User = require('../APPI/user');
var passport = require("passport");



exports.register = function(req, res){
    
    var newUser = new User({
        username: req.body.username,
      
        email: req.body.email,
       
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
docs.email= req.body.email;
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
 
 
