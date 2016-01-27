var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/show/:id', function(req, res, next) {
  res.render('show');
})

router.get('/new', function(req, res, next) {
  res.render('index', { title: 'Show Up' });
});

router.get('/venues', function(req, res, next) {
  res.render('venues')
})

router.get('/venues/new', function(req, res, next) {
  res.render('venues')
})

router.get('/venue/:id', function(req, res, next) {
  res.render('venue')
})

router.get('/venue/edit/:id', function(req, res, next) {
  res.render('venue')
});

module.exports = router;
