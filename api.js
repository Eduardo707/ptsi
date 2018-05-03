



/*
function find1(dbo,result) {
  dbo.collection("leituras").find({}).toArray(function(err, result) {
/*    if (err) throw err;
    console.log(result);
   
});}


  const MongoClient = require('mongodb').MongoClient;
  const test = require('assert');
  
  // Connection url
  const url = 'mongodb://ed:ed@ds237489.mlab.com:37489/heroku_4jqslj1n';
  // Database Name
 
  // Connect using MongoClient
  MongoClient.connect(url, function(err, db) {
        if (err) throw err;
   var dbo = db.db("heroku_4jqslj1n");
   
   find1(dbo);
   
   app.post('/login', function(res) {
  /*  const user = new UserType(req.body);
    user.email = user.email.toLowerCase();
    // Search for existing user unless email ends with given string
 
   find1(dbo, res1);
   return res.send(res1);
      
    }
   

//chamar documentos da bd
 /* dbo.collection("registos").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();*/
    
  /*  dbo.collection("registos").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    });
    */
    
    /*dbo.collection('registos').insertOne(
    {
      
    _id: "3",
    verificacao: "on"

    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
    }
  )
    dbo.collection('registos').deleteOne(
    {
      
    _id: "3",
    verificacao: "on"

    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
    }
  )
  
});*/