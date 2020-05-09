"use strict";
//ROUTES RELATED TO LEARNING GENERAL FUNCTIONALITY
var express = require('express');
var router = express.Router();

//Render pages
router.get('/', function(req, res) {
    res.set({ 'Content-Type': 'application/xhtml+xml; charset=utf-8' });
    res.render('index');
});

module.exports = router;
