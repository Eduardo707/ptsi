//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var passport= require("passport");
var bodyParser= require('body-parser');
var User= require('./api/APPI/user');

var mongoose= require('mongoose');
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var LocalStrategy= require("passport-local");
//var passportLocalMongoose= require("passport-local-mongoose");


var flash= require('connect-flash');
/*var cookieParser= require('cookie-parser');
var session= require("express-session");
var moment= require('moment');


*/


//router.use(express.static(__dirname, '/client'));

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];






/*
var gets= require("./gets")

app.use("/get", gets);
*/


router.configure(function() {
  router.use(express.cookieParser('keyboard cat'));
router.use(express.session({ cookie: { maxAge: 60000 }}));
  router.use(flash());
});




router.use(bodyParser.urlencoded({extended:true}));
router.use(require("express-session")({
secret:"Rusty is the best og in the world",
resave: false,
saveUninitialized: false
}));

router.set('view engine','ejs');
router.use(passport.initialize());
router.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 






mongoose.connect('mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n');

var db= mongoose.connection;




//var index= require('./api/routes/index');
var routes= require('./api/routes/allRoutes');
//app.use('/', index);
router.use('/', routes);



/////////////////////////////////////




router.get("/post/leituras", function(req, res){
    
res.render("leituras", {page: 'leituras'}); 

});
router.get("/register", function(req, res){
    
res.render("register", {page: 'register'}); 

});



router.get("/get/pacientes", function(req, res){
    
   res.redirect("/get/pacientes"); 

});

//---------
// show register form
router.get("/register", function(req, res){
     req.flash("reg", "register here");
res.render("register", {page: 'register'}); 
});

router.get("/login", function(req, res){
   
res.render("login", {page: 'login'}); 
});

router.get("/login", function(req, res){
   
res.render("login", {page: 'login'}); 
});

router.get('/forgot', function(req, res) {
  res.render('forgot');
});


router.post('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
