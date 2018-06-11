'use strict';

var mongoose = require('mongoose');
var User = require('../APPI/user');
var passport = require("passport");
var async = require("async");
var crypto = require("crypto");
var nodemailer = require("nodemailer");


exports.forgot =  function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
       done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
        //  req.flash('error', 'No account with that email address exists.');
          return done(null,err);
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
     /*  Gmail.find(function(err, docs){
      console.log(docs);
     process.env.USER = docs.username;
    });*/
      var smtpTransport = nodemailer.createTransport({
        
        
        
     
        service: 'Gmail', 
        auth: {
          user: 'diabetes.ptsi2018@gmail.com',
          pass: 'ptsidiabetes'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'diabetes.ptsi2018@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
      //  req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        res.json('done');
        done(err, 'done');
      });
    }
  ], function(err) {
  //  if (err) return next(err);
  //  res.redirect('/forgot');
  });
};





//////////////////////
exports.get_reset =  function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.json('reset', {token: req.params.token});
  });
};

exports.post_reset = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
              res.json('back');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                     res.json(user);
                done(err, user);
              });
            });
          })
        } else {
               res.json('back');
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'diabetes.ptsi2018@gmail.com',
          pass: 'ptsidiabetes'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'diabetes.ptsi2018@mail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.json('reset successfull');
  });
};
