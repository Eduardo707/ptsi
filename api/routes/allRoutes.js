'use strict';
var http= require("http");
var express= require('express');
var crypto = require("crypto");

var mongoose = require('mongoose');
var Users = require('../APPI/user');

var router= express();
var passport = require("passport");

const userr= require('../controllers/user_controller');
const log= require('../controllers/login_controller');
const email= require('../controllers/email_controller');
const readings= require('../controllers/readings_controller');
const readings_gli= require('../controllers/readings_gli_controller');
const pacients= require('../controllers/pacient_controller');
const medics= require('../controllers/medic_controller');
const notifications= require('../controllers/notifications_controller');

/* function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render('login');
    }
}

router.use(loggedIn);*/
 
 router.get('/', function(req, res) {
  res.render("index", {page: 'index'}); 
  res.json('index');
 
});
router.get('/index', function(req, res) {
  res.json('home2');
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        
        console.log(req.user.id);
    } else {
     res.json(req.user);
       
    }
}

 router.get('/logout',log.logout);
 router.post('/login', tok,passport.authenticate('local', 'bearer'), (req, res, next) => {
  console.log({session: req.session, user: req.user});
});
  
  function tok(req,res,next){
             
   Users.findOne({username: req.body.username}, function(err, docs) {
    console.log(docs);
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
         docs.token = token;
         docs.resetSessionExpires = Date.now() + 3600000;
        docs.save(function(err, docs) {
        if(err) {
            console.log(err);
            res.json({err});
        }
      console.log('y');
   
    next();

    });  
        

});}); 
  };
  
    router.post('/login1',passport.authenticate("bearer"), function (req, res) {
   res.json(req.user);
});
  

// PARTE DOS ROLES
  //app.route('/users')
  router.post('/users/new', passport.authenticate("bearer", {session: true}),userr.register);
  router.get('/users/lists',loggedIn,userr.get_all_users);
  router.get('/users/profile',passport.authenticate("bearer", {session: true}),userr.get_user_profile);
router.post('/users/update/:id',passport.authenticate("bearer", {session: true}),userr.update_user);


 
  
  router.post('/forgot',loggedIn,email.forgot);
router.get('/reset/:token',passport.authenticate("bearer", {session: true}),email.get_reset);
router.post('/reset/:token',passport.authenticate("bearer", {session: true}),email.post_reset);
  
  router.get('/readings/getAll',passport.authenticate("bearer", {session: true}),readings.get_all_reads);
  router.post('/readings/new',passport.authenticate("bearer", {session: true}),readings.post_readings);
  router.get('/readings/user',passport.authenticate("bearer", {session: true}),readings.get_user_reads);
  router.get('/readings/recent',passport.authenticate("bearer", {session: true}),readings.get_recent_read);
router.post('/readings/:id',passport.authenticate("bearer", {session: true}),readings.update_read);


 router.get('/readings_gli/all',passport.authenticate("bearer", {session: true}),readings_gli.get_all_reads_gli);
  router.post('/readings_gli/new',passport.authenticate("bearer", {session: true}),readings_gli.create_readings_gli);
  router.get('/readings_gli/user',passport.authenticate("bearer", {session: true}),readings_gli.get_user_reads_gli);
  router.get('/readings_gli/recent',passport.authenticate("bearer", {session: true}),readings_gli.get_recent_read_gli);
router.post('/readings_gli/:id',passport.authenticate("bearer", {session: true}),readings_gli.update_read_gli);


 router.get('/pacients/all',passport.authenticate("bearer", {session: true}),pacients.get_all_pacients);
  router.post('/pacients/new',passport.authenticate("bearer", {session: true}),pacients.create_pacients);
  router.get('/pacients/user',passport.authenticate("bearer", {session: true}),pacients.get_user_pacients);
  router.get('/pacients/recent',passport.authenticate("bearer", {session: true}),pacients.get_recent_pacients);
router.post('/pacients/:id',passport.authenticate("bearer", {session: true}),pacients.update_pacients);


 router.get('/medics',passport.authenticate("bearer", {session: true}),medics.get_all_medics);
  router.post('/medics/new',passport.authenticate("bearer", {session: true}),medics.create_medics);
  router.get('/medics/user',passport.authenticate("bearer", {session: true}),medics.get_user_medics);
  router.get('/medics/recent',passport.authenticate("bearer", {session: true}),medics.get_recent_medics);
router.post('/medics/:id',passport.authenticate("bearer", {session: true}),medics.update_medics);


 router.get('/notifications',passport.authenticate("bearer", {session: true}),notifications.get_all_notifs);
  router.post('/notifications/new',passport.authenticate("bearer", {session: true}),notifications.create_notifs);
  router.get('/notifications/user',passport.authenticate("bearer", {session: true}),notifications.get_user_notifs);
  router.get('/notifications/recent',passport.authenticate("bearer", {session: true}),notifications.get_recent_notifs);
router.post('/notifications/:id',passport.authenticate("bearer", {session: true}),notifications.update_notifs);



  
  
module.exports= router;




