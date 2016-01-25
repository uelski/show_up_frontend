var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next) {
  res.render('index', { title: 'Show Up' });
});

router.get('/venues', function(req, res, next) {
  res.render('venues')
})

router.get('/venues/new', function(req, res, next) {
  res.render('venues')
})

module.exports = router;
