'use strict';
var http= require("http");
var express= require('express');

var router= express();
var passport = require("passport");

const user= require('../controllers/user_controller');
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
        res.redirect('/login');
    }
}

 router.get('/logout',log.logout);
  router.post('/login',passport.authenticate("local"), function (req, res) {
   res.json(req.user);
});
  
  

// PARTE DOS ROLES
  //app.route('/users')
  router.post('/users/new', loggedIn,user.register);
  router.get('/users/lists',user.get_all_users);
  router.get('/users/profile',loggedIn,user.get_user_profile);
router.post('/users/update/:id',loggedIn,user.update_user);


 
  
  router.post('/forgot',loggedIn,email.forgot);
router.get('/reset/:token',loggedIn,email.get_reset);
router.post('/reset/:token',loggedIn,email.post_reset);
  
  router.get('/readings/getAll',loggedIn,readings.get_all_reads);
  router.post('/readings/new',loggedIn,readings.post_readings);
  router.get('/readings/user',loggedIn,readings.get_user_reads);
  router.get('/readings/recent',loggedIn,readings.get_recent_read);
router.post('/readings/:id',loggedIn,readings.update_read);


 router.get('/readings_gli/all',loggedIn,readings_gli.get_all_reads_gli);
  router.post('/readings_gli/new',loggedIn,readings_gli.create_readings_gli);
  router.get('/readings_gli/user',loggedIn,readings_gli.get_user_reads_gli);
  router.get('/readings_gli/recent',loggedIn,readings_gli.get_recent_read_gli);
router.post('/readings_gli/:id',loggedIn,readings_gli.update_read_gli);


 router.get('/pacients/all',loggedIn,pacients.get_all_pacients);
  router.post('/pacients/new',loggedIn,pacients.create_pacients);
  router.get('/pacients/user',loggedIn,pacients.get_user_pacients);
  router.get('/pacients/recent',loggedIn,pacients.get_recent_pacients);
router.post('/pacients/:id',loggedIn,pacients.update_pacients);


 router.get('/medics',loggedIn,medics.get_all_medics);
  router.post('/medics/new',loggedIn,medics.create_medics);
  router.get('/medics/user',loggedIn,medics.get_user_medics);
  router.get('/medics/recent',loggedIn,medics.get_recent_medics);
router.post('/medics/:id',loggedIn,medics.update_medics);


 router.get('/notifications',loggedIn,notifications.get_all_notifs);
  router.post('/notifications/new',loggedIn,notifications.create_notifs);
  router.get('/notifications/user',loggedIn,notifications.get_user_notifs);
  router.get('/notifications/recent',loggedIn,notifications.get_recent_notifs);
router.post('/notifications/:id',loggedIn,notifications.update_notifs);



  
  
module.exports= router;




