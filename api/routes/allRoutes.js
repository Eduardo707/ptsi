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
const mp= require('../controllers/m_p_controller');
const ca= require('../controllers/calendar_controller');

const notifications= require('../controllers/notifications_controller');

/* function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render('login');
    }
}

router.use(loggedIn);*/

//router.listen(process.env.PORT || 5000);
 
 router.get('/', function(req, res) {
  res.render("login", {page: 'login'}); 
  
 
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



var cc;
 router.get('/cc',function(req, res) {
     res.json(req.user);
 });
 router.get('/logout',log.logout);
 router.post('/login', tok,passport.authenticate('local'), (req, res) => {
      
//  res.json({session: req.session, user: req.user});
/*req.session.save((err) => {
    if (err) {
      return next(err);
    }
    console.log('req.session', req.session)
    console.log('req.user', req.user)
    res.session = { cookie: req.session.cookie }
    res.cookie('userid', req.user._id, { maxAge: 2592000000 });*/
 //   cc = "hello";
   res.status(200).json({msg:"true",  user: req.user});
  
  //});
});
  
  function tok(req,res,next){
             
   Users.findOne({username: req.body.username}, function(err, docs) {
    console.log(Date.now());
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
         docs.token = token;
         docs.resetSessionExpires = Date.now() + 86400000;
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
  


// PARTE DOS ROLES
  //app.route('/users')
  router.post('/users/new', userr.register);
  router.get('/users/lists',passport.authenticate("bearer", {session: false}),userr.get_all_users);
  router.get('/users/profile',passport.authenticate("bearer", {session: false}),userr.get_user_profile);
router.post('/users/update/:id',passport.authenticate("bearer", {session: false}),userr.update_user);


 
  
  router.post('/forgot',email.forgot);
router.get('/reset/:token',email.get_reset);
router.post('/reset/:token',email.post_reset);
  
  router.get('/readings/all',passport.authenticate("bearer", {session: false}),readings.get_all_reads);
  router.post('/readings/new', readings.post_readings);
  router.get('/readings/user',passport.authenticate("bearer", {session: false}),readings.get_user_reads);
  router.get('/readings/recent',passport.authenticate("bearer", {session: false}),readings.get_recent_read);
router.post('/readings/:id',passport.authenticate("bearer", {session: false}),readings.update_read);


 router.get('/readings_gli/all',passport.authenticate("bearer", {session: false}),readings_gli.get_all_reads_gli);
  router.post('/readings_gli/new',passport.authenticate("bearer", {session: false}),readings_gli.create_readings_gli);
  router.get('/readings_gli/user',passport.authenticate("bearer", {session: false}),readings_gli.get_user_reads_gli);
  router.get('/readings_gli/recent',passport.authenticate("bearer", {session: false}),readings_gli.get_recent_read_gli);
     router.get('/readings_gli/medic',passport.authenticate("bearer", {session: false}),readings_gli.get_medic_reads_gli);


router.post('/readings_gli/:id',passport.authenticate("bearer", {session: false}),readings_gli.update_read_gli);



// router.get('/readings_gli/ll',readings_gli.get_ll_reads_gli);


 router.get('/pacients/all',passport.authenticate("bearer", {session: false}),pacients.get_all_pacients);
  router.post('/pacients/new',passport.authenticate("bearer", {session: false}),pacients.create_pacients);
  router.get('/pacients/user',passport.authenticate("bearer", {session: false}),pacients.get_user_pacients);
    router.get('/pacients2/:email',passport.authenticate("bearer", {session: false}),pacients.get_user_pacients2);

  router.get('/pacients/recent',passport.authenticate("bearer", {session: false}),pacients.get_recent_pacients);
router.put('/pacients/:id',passport.authenticate("bearer", {session: false}),pacients.update_pacients);


 router.get('/medics',passport.authenticate("bearer", {session: false}),medics.get_all_medics);
  router.post('/medics/new',passport.authenticate("bearer", {session: false}),medics.create_medics);
  router.get('/medics/user',passport.authenticate("bearer", {session: false}),medics.get_user_medics);
  router.get('/medics/recent',passport.authenticate("bearer", {session: false}),medics.get_recent_medics);
router.post('/medics/:id',passport.authenticate("bearer", {session: false}),medics.update_medics);

  router.get('/mp/list', mp.get_medic_p);
 router.post('/mp/new', mp.create_m_p);

 router.get('/mp/all', mp.get_all_m_p);
 

 router.get('/calendar/all',ca.get_all_calendar);
  router.post('/calendar/new',ca.create_calendar);
  router.get('/calendar/user',passport.authenticate("bearer", {session: false}),ca.get_user_calendar);
router.post('/calendar/:id',passport.authenticate("bearer", {session: false}),ca.update_calendar);

 

 router.get('/notifications',passport.authenticate("bearer", {session: false}),notifications.get_all_notifs);
  router.post('/notifications/new',passport.authenticate("bearer", {session: false}),notifications.create_notifs);
  router.get('/notifications/user',passport.authenticate("bearer", {session: false}),notifications.get_user_notifs);
  router.get('/notifications/recent',passport.authenticate("bearer", {session: false}),notifications.get_recent_notifs);
router.post('/notifications/:id',passport.authenticate("bearer", {session: false}),notifications.update_notifs);



  
  
module.exports= router;




