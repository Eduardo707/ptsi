var express= require('express');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var User= require('./api/APPI/user');
var Patients= require('./api/APPI/pacientes');
var Medics= require('./api/APPI/medicos');
var Chat= require('./api/APPI/notificacoes');

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

/*
passport.use(new LocalStrategy(
    {usernameField:'username'},
    
  function(userID, password, done) {
    User.findOne({ userID: userID }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
*/

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use('medic', new LocalStrategy( function(username, done) {
       Medics.findOne({ medicID: username}, function (err, user) {
      console.log(user);;
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'User not active' }) }
      return done(null, user);
    })}));

passport.use('patient', new LocalStrategy(
    function(username, done) {
  

       Patients.findOne({ patientID: username}, function (err, user) {
      console.log(user);
      if (err) { return done(null, err); }
      if (!user) { return done(null, false, { message: 'Not patient' }); }
        if (!user.Active) { return done(null, false ,{ message: 'User not active' }); }
      return done(null, user);
    });
    
}
));

passport.use(new BearerStrategy( function(access_token, done) {
  
    User.findOne({ token: access_token, resetSessionExpires:{ $gt: Date.now() }}, function (err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: '*' });
    });
  }
));

 






mongoose.connect('mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n');

var db= mongoose.connection;






        
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

app.get("/reads", function(req, res){
    
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

});app.get("/login1", function(req, res){

res.render("login1", {page: 'reset'}); 

});

app.get("/index", function(req, res){

res.render("index", {page: 'index'}); 

});
app.get("/pacients/new", function(req, res){
    
   res.render("pacientes"); 

});


app.get("/notif", function(req, res){
    
   res.render("notifications"); 

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

app.get("/login/patient", function(req, res){
   
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

var mmm = "d";

io.on('connection', (socket) => {
     





socket.on('identify', function(userNickname) {
mmm = 'sss';
    


        console.log(userNickname +" : has joined the chat "  );
          
    //   socket.join(userNickname);  
       //console.log( socket );

        socket.broadcast.emit('userjoinedthechat',userNickname);
        
        Chat.findOne({$or:[{medic_username: userNickname},{patient_username:userNickname}]}, function(err, docs){
         if(err) {
            console.log(err);
          
        }else{  messages = [];
       
       
         if(docs!=null){
              mmm = docs.medic_username ;
socket.join(docs.medic_username);
       

         messages = docs.msg.slice(- 10);
console.log(messages);
 messages.forEach(function (data) {
      socket.emit('message', data);
     console.log( docs.medic_username);
    });
             
         }
            
        }

 


    });
        
          


    sockets.push(socket);
console.log('user connected');



    });

   



socket.on('newmessage', (name,text,date) => {
         Chat.findOne({$or:[{medic_username: name},{patient_username:name}]}, function(err, docs){
         if(err) {
            console.log(err);
          
        } 
       //log the message in console 

      //create a message object 
       let  data = {"text":text, "name":name, "date": new Date()};
       
      if(docs!=null){ 
      console.log(docs.medic_username);
          // send the message to the client side  
       io.to(docs.medic_username).emit('message', data );
       
            console.log(data);
                    messages.push(data);
                      

        
        docs.msg.push(data);
             docs.save();
    
        }
 

 
   
    });


      });
      
      
      socket.on('seentext', (name,text,date) => {
         Chat.findOne({$or:[{medic_username: name},{patient_username:name}]}, function(err, docs){
         if(err) {
            console.log(err);
          
        } 
       //log the message in console 

      //create a message object 
       //let  data = {"text":text, "name":name, "date": new Date()};
       
      if(docs!=null){ 

    for(var i =0; i<docs.msg.length; i++){
                    console.log(docs.msg[i].name);

        
        if(docs.msg[i].name== name && docs.msg[i].text == text && docs.msg[i].date == date){
            console.log(docs.msg[i].name);
            
            docs.msg[i].is_seen = true;
       
            
        }
        
        
    }
         docs.save(function(err, docs) {
        if(err) {
            console.log(err);
         
        }
      console.log('y');
   
      
 

    });

    
    
    
    
        }
 

 
   
    });


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
server.listen(process.env.PORT || 3000 , process.env.IP || '0.0.0.0', ()=>{
console.log('https://39e4c824149241e2b62a8cf411671688.vfs.cloud9.us-east-2.amazonaws.com/');

});

console.log('run');


