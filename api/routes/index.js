'use strict';

var express = require('express');
var router =  new express();

var routes= require('./allRoutes');
//app.use('/', index);
router.use('/', routes);
router.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = router.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

module.exports = router;
