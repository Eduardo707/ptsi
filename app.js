var express= require('express');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var User= require('./api/APPI/user');

var path = require('path');
var passport= require("passport");
var app= express();

var LocalStrategy= require("passport-local");



var flash= require('connect-flash');
var cookieParser= require('cookie-parser');
var session= require("express-session");


app.use(express.static(path.resolve(__dirname, 'client')));

/*app.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function(){
  var addr = app.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});*/
//app.use(express.static(path.resolve(__dirname, 'views')));
//app.use(express.static(__dirname + '/views'));


/*var methodOverride= require("method-override");
app.use(methodOverride("_method"));*/
//app.use(express.static(path.resolve(__dirname, 'views')));




/*
var gets= require("./gets")

app.use("/get", gets);
*/


app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});




app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
secret:"Rusty is the best og in the world",
resave: false,
saveUninitialized: false
}));

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
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
app.get("/register", function(req, res){
    
res.render("register", {page: 'register'}); 

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

app.get("/login", function(req, res){
   
res.render("login", {page: 'login'}); 
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

/*
//handling user sign up
app.post("/register", function(req, res){
var newUser= new User({
username: req.body.username,
      
email: req.body.email,
       
      });

if(req.body.adminCode=== 'admin') {
newUser.isAdmin= true;
    }

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/home"); 
        });
    });
});

app.get("/login", function(req, res){
res.render("login", {page: 'login'}); 
});


app.post("/login", passport.authenticate("local", 
    {
successRedirect: "/home",
failureRedirect: "/login",
failureFlash: true,
successFlash: 'Welcome!'
    }), function(req, res){
//res.render("home" , { expressFlash: req.flash('success')}); 

});

app.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/home");
});*/


/*
app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
var token= buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

user.resetPasswordToken= token;
user.resetPasswordExpires= Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
     /*  Gmail.find(function(err, docs){
      console.log(docs);
process.env.USER= docs.username;
    });
var smtpTransport= nodemailer.createTransport({
        
        
        
     
service: 'Gmail', 
auth: {
user: 'diabetes.ptsi2018@gmail.com',
pass: 'ptsidiabetes'
        }
      });
var mailOptions= {
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
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});
*/
/*app.get('/reset/:token', function(req, res) {
User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
res.render('reset', {token: req.params.token});
  });
});*/
/*
app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
if(req.body.password=== req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
user.resetPasswordToken= undefined;
user.resetPasswordExpires= undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
var smtpTransport= nodemailer.createTransport({
service: 'Gmail', 
auth: {
user: 'diabetes.ptsi2018@gmail.com',
pass: 'ptsidiabetes'
        }
      });
var mailOptions= {
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
    res.redirect('/login');
  });
});
*/

/*app.get('/tests', function(req, res) {
    User.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});
*/

/*app.get("/api/gets", (req, res, next)=> {
  User.find()
    .exec()
.then(docs=> {
      console.log(docs);
//   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
//           message: 'No entries found'
      //       });
      //   }
    })
.catch(err=> {
      console.log(err);
      res.status(500).json({
error: err
      });
    });
});*/




/*app.get('/api/logins', function(req, res){
    
});*/

//leituras-----------------------------------------------------------------------------------------------

/*app.post("/post/leituras", function(req, res){
var newL= new Leituras({
username: req.body.username,
ritmo: req.body.ritmo,  
pressao_art: req.body.pressao_art, 
temp_pele: req.body.temp_pele,
ph: req.body.ph,
passos:req.body.passos,
data_resg: Date.now(),
notas: req.body.notas
       
      });



    newL.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
});*/

/*app.get("/get/leituras", function(req, res,next) {
    Leituras.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});*/
/*
app.get("/get/leituras/user", function(req, res) {
Leituras.find({username: 'lu'},function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

app.get("/get/leituras/last", function(req, res) {
Leituras.findOne().sort({"date_reg": -1}).exec(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});
*/
//LEITURAS GLI----------------------------------------------------------------------------
/*app.post("/post/leituras_gli", function(req, res){
var newLg= new Leituras_gli({
username: 'lu',
glicemia: req.body.glicemia,  
glicemia_a: req.body.glicemia_a, 
glicemia_p: req.body.glicemia_p,
   
data_resg: Date.now(),
    
      });



    newLg.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.json("sucesso");
    });
});




app.get("/get/leituras_gli", function(req, res) {
    Leituras_gli.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});




app.get("/get/leituras/date", function(req, res) {
Leituras.findOne({data_resg: 'edd'},function(err, docs){
      console.log(docs);
//ar date= new Date(docs.data_resg);
// var date= ISODate(docs.data_resg);
    //  console.log(docs.data_resg.getMonth()+1);
      
      res.json(docs);
    });
});


app.get("/get/leituras_gli/user", function(req, res) {
Leituras_gli.findOne({username: req.body.username},function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

app.get("/get/leituras_gli/last", function(req, res) {
Leituras.findOne().sort({"date_reg": -1}).exec(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});



app.post("/update/leituras_gli", function(req, res) {
   
var id= req.body.id;
 
Leituras_gli.findOne({_id: id},function(err, docs){
    
       if(err){
            console.log(err);
            
        }
        // res.send(docs);
        
docs.glicemia= req.body.glicemia;
docs.glicemia_p= req.body.glicemia_p;
docs.glicemia_a= req.body.glicemia_a;
       
     docs.save(function(err, docs) {
      if(err){
        console.log(err);
        
      }
      console.log('y');
      res.send(docs);
      
 

    });
});
 });

*/


//-PACIENTES----------------------------------------------------------
/*app.get("/get/pacientes", function(req, res) {
    Pacientes.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

app.post("/post/pacientes", function(req, res){
var newP= new Pacientes({
username: req.body.username,
nome: req.body.nome,  
num_tel: req.body.num_tel, 
morada: req.body.morada,
mail: req.body.mail,
utente:req.body.utente,
data_nasc: Date.now(),
beneficiario: req.body.beneficiario,
app: req.body.app
      
});

    newP.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
});

app.get("/get/pacientes/:id", function(req, res) {
Pacientes.findOne({_id: req.params.id},function(err, docs){
       if(err){
            console.log(err);
            
        }
      console.log(docs);
      res.json(docs);
    });
});



/*app.get("/put/pacientes", function(req, res) {
  res.render('/put/pacientes');
});


app.post("/update", function(req, res) {
   
var id= req.body.id;
 
Pacientes.findOne({username: id},function(err, docs){
    
       if(err){
            console.log(err);
            
        }
        // res.send(docs);
        
docs.morada= req.body.morada;
     docs.save(function(err, docs) {
      if(err){
        console.log(err);
        
      }
      console.log('y');
      res.send(docs);
      
 

    });
});
 });



app.post("/put/pacientes",  function(req, res, next){
  Pacientes
.findOneAndUpdate({ username: 'lu' }, req.body.morada)
    .exec(function(err, docs) {
       if (err)  {
        console.log('fffff')
       };
       res.json(docs);
       
     });
   });
*/


//UTILIZADOR-------------------------------------------------------------------------------------------------------


//MEDICOS------------------------------------------------------------------------------
/*app.get("/get/medicos", function(req, res) {
    Medicos.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

app.get("/get/medicos/name", function(req, res) {
Medicos.findOne({nome: req.body.name},function(err, docs){
       if(err){
            console.log(err);
            
        }
      console.log(docs);
      res.json(docs);
    });
});

app.post("/post/medicos", function(req, res){
var newM= new Medicos({
username: req.body.username,
nome: req.body.nome,  
num_tel: req.body.num_tel, 
morada: req.body.morada,
mail: req.body.mail,
especialidade:req.body.especialidade,
data_nasc: Date.now(),
cedula: req.body.cedula,
data_acesso: req.body.data_acesso
    
      
});

    newM.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
});*/
//NOTIFICACOES-------------------------------------------------------------------------------
/*app.get("/get/notificacoes", function(req, res) {
    Notificacoes.find(function(err, docs){
      console.log(docs);
      res.json(docs);
    });
});

app.get("/get/notificacoes/user", function(req, res) {
Notificacoes.findOne({username: req.body.username},function(err, docs){
       if(err){
            console.log(err);
            
        }
      console.log(docs);
      res.json(docs);
    });
});


app.post("/post/notificacoes", function(req, res){
var newN= new Notificacoes({
username: req.body.username,
paciente: req.body.paciente,  
aviso: req.body.aviso, 
nivel: req.body.nivel
    
      
});

    newN.save(function(err){
        if(err){
            console.log(err);
            
        }
       res.send("sucesso");
    });
});
*/


//----------------


//DATAS------------------------------------------------------------------------------

/*var startDate= moment(data_resg.params.startTime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
var endDate= moment(data_resg.params.endTime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

//Find 
Leituras.find({
unit_id: data_resg.params.unit_id,
utc_ts: {
$gt: startDate,
$lt: endDate
    }
}, function(err, positions) {
    if (err) {
        return err
    }
    else {
        //console.log(positions);
        res.json(positions);
    }
});

Leituras.t1.find({dt:{$gt:ISODate("2015-06-22T13:40:00.000Z"),$lt:ISODate("2015-06-22T13:41:00.000Z")} })*/
module.exports= app;


console.log('run');


