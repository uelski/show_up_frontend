var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('band', {title: 'Show Up'});
});

router.get('/login', function(req, res, next){
  res.render('login');
})
router.post('/logout', function(req, res) {

})
router.get('/new', function(req, res, next) {
  res.render('band', {title: 'Show Up'});
});

module.exports = router;
