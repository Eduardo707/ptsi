'use strict';

var mongoose = require('mongoose');
//var User = require('./APPI/user');
var passport = require("passport");



exports.login =  passport.authenticate("local"), function (req, res) {
   res.json('success');
};





exports.logout =  function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/home");
};