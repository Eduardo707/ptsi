'use strict';

var express = require('express');
var router =  new express();


router.get('/', function(req, res) {
    console.log('ge')
  res.redirect('/allRoutes');

});

module.exports = router;