'use strict';

var express = require('express');
var router =  new express();

var routes= require('./allRoutes');
//app.use('/', index);
router.use('/', routes);
router.listen(process.env.PORT || 3000);
module.exports = router;
