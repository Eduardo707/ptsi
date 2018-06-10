var express= require('express');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var User= require('./api/APPI/user');

var path = require('path');
var crypto = require("crypto");
var passport= require("passport");
var app= express();
var session = require("express-session");
var LocalStrategy= require("passport-local").Strategy;
var BearerStrategy= require("passport-http-token").Strategy;
 
     




//app.use(express.static(__dirname + '/views'));

app.use(express.static(path.resolve(__dirname, 'views')));

/*app.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function(){
  var addr = app.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});*/
//app.use(express.static(path.resolve(__dirname, 'views')));
//


/*var methodOverride= require("method-override");
app.use(methodOverride("_method"));*/
//app.use(express.static(path.resolve(__dirname, 'views')));




/*
var gets= require("./gets")

app.use("/get", gets);
*/






// app.use(express.cookieParser());
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



passport.use(new BearerStrategy( function(token, done) {
    User.findOne({ token: token, resetSessionExpires: { $gt: Date.now() } }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 






mongoose.connect('mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n');

var db= mongoose.connection;



  
        
//var index= require('./api/routes/index');
var routes= require('./api/routes/index');
//app.use('/', index);
app.use('/', routes);



/////////////////////////////////////




app.get("/post/leituras", function(req, res){
    
res.render("leituras", {page: 'leituras'}); 

});
app.get("/users/new", function(req, res){
    
res.render("register", {page: 'register'}); 

});

app.get("/site", function(req, res){
    
res.render("site", {page: 'site'}); 

});




app.get("/get/pacientes", function(req, res){
    
   res.redirect("/get/pacientes"); 

});

//---------
// show register form
app.get("/register", function(req, res){
     req.flash("reg", "register here");
res.render("register", {page: 'register'}); 
});

app.get("/login", function(req, res){
   
res.render("login", {page: 'login'}); 
});

app.get("/login1", function(req, res){
   
res.render("login1", {page: 'login1'}); 
});

app.get('/forgot', function(req, res) {
  res.render('forgot');
});


app.post('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});







module.exports= app;
app.listen(process.env.PORT || 3000);




console.log('run');


