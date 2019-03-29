var express= require('express');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var User= require('./api/APPI/user');
var Chat= require('./api/APPI/chat');

var cookieParser = require('cookie-parser');

var path = require('path');
var crypto = require("crypto");
var passport= require("passport");
var app= express();
var session = require("express-session");
var LocalStrategy= require("passport-local").Strategy;
var BearerStrategy= require("passport-http-bearer").Strategy;
 
  app.use(function(req, res, next){
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.header('Access-Control-Allow-Credentials', "true");
     next();
 });
     
var http = require('http');

var async = require('async');
var socketio = require('socket.io');

var messages = [];
var sockets = [];


var server = http.createServer(app);

var io = socketio.listen(server);


/*app.use(function(req, res, next){
   res.locals.currentUser = req.user;
  
   next();
});*/
app.use(express.static(path.resolve(__dirname, 'views')));


/*var methodOverride= require("method-override");
app.use(methodOverride("_method"));*/
//app.use(express.static(path.resolve(__dirname, 'views')));




/*
var gets= require("./gets")

app.use("/get", gets);
*/





app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
secret:"Rusty is the best og in the world",
resave: false,
saveUninitialized: false
}));

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
 /*
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
           crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
         user.token= token;
         user.resetSessionExpires = Date.now() + 1800000;
        user.save();
        return done(null, user);
        

})
     
    });
  }
)



);


*/

passport.use(new LocalStrategy(User.authenticate()));



passport.use(new BearerStrategy( function(access_token, done) {
  
    User.findOne({ token: access_token, resetSessionExpires:{ $gt: Date.now() }}, function (err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: '*' });
    });
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 






mongoose.connect('mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n');

var db= mongoose.connection;

app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});


        
//var index= require('./api/routes/index');
var routes= require('./api/routes/index');
//app.use('/', index);
app.use('/', routes);



/////////////////////////////////////




app.get("/readings_gli/new", function(req, res){
    
res.render("leituras_gli", {page: 'leituras_gli'}); 

});
app.get("/users/new", function(req, res){
    
res.render("register", {page: 'register'}); 

});

app.get("/medics/id", function(req, res){
    
res.render("leituras", {page: 'leituras'}); 

});
app.get("/mp/new", function(req, res){
    
res.render("mp", {page: 'mp'}); 

});
app.get("/site", function(req, res){
    
res.render("site", {page: 'site'}); 

});

app.get("/chat", function(req, res){

res.render("chat", {page: 'chat'}); 

});

app.get("/index", function(req, res){

res.render("index", {page: 'index'}); 

});
app.get("/pacients/user", function(req, res){
    
   res.render("pacientes"); 

});

//---------
// show register form
app.get("/register", function(req, res){
     //req.flash("reg", "register here");
res.render("register", {page: 'register'}); 
});

app.get("/login", function(req, res){
   
res.render("login", {page: 'login'}); 
});



app.get('/forgot', function(req, res) {
  res.render('forgot');
});

//-nnnn


app.post('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});



io.on('connection', (socket) => {
  
messages.forEach(function (data) {
      socket.emit('message', data);
      console.log(data);
    });

    sockets.push(socket);
console.log('user connected');




socket.on('identify', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });


socket.on('message', (name,text) => {
       
       //log the message in console 

        //create a message object 
       let  data = {"text":text, "name":name}
          // send the message to the client side  
       io.emit('message', data );
       
            console.log(data);
                    messages.push(data);


      });
      
  
 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});


        
        /*--------------------------------------------- base dados      
  
        
var newC= new Chat({


medic_username: "dsa",
//req.body.nome,  
patient_username:"aaa"
    
       
      });
newC.msg.push({name: data.name, text: data.text})


    newC.save(function(err){
        if(err){
            console.log(err);
            
        }
     
    });
        
  --------------------------------------------- base dados   */   
        
        
      });
    



module.exports= app;





//server.listen(app);
/*
server.listen(process.env.PORT || 5000, process.env.IP , function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});*/
server.listen(process.env.PORT || 3000 ,()=>{

console.log('Node app is running on port 3000');

});

console.log('run');


