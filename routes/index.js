"use strict";
//ROUTES RELATED TO LEARNING GENERAL FUNCTIONALITY
var express = require('express');
var router = express.Router();
var request = require('request');

//Render pages
router.get('/', function(req, res) {
  res.set({ 'Content-Type': 'application/xhtml+xml; charset=utf-8' });
  res.render('index');
});

//Search for movies given a search string
router.get('/search', function(req, res) {
  let title = req.queryString('title');
  let page_num = req.queryInt('page_num') || 1;
  let request_url = 'http://www.omdbapi.com/?apikey=ae97a915&plot=short&s=' + title + '&page=' + page_num;

  request(request_url, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      let results = JSON.parse(response.body).Search;

      res.set({ 'Content-Type': 'application/xhtml+xml; charset=utf-8' });
      res.render('search', {
        search_title: title,
        results: results,
        page_num: page_num
      });
    }
  });
});

//Get more info about a movie given its imdbID
router.get('/info/:imdbID', function(req, res) {
  let request_url = 'http://www.omdbapi.com/?apikey=ae97a915&plot=full&i=' + req.params.imdbID;
  request(request_url, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      let results = JSON.parse(response.body);

      res.set({ 'Content-Type': 'application/xhtml+xml; charset=utf-8' });
      res.render('info', {
        results: results
      });
    }
  });
});

module.exports = router;
