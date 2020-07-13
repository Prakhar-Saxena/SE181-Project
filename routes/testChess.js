var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('testChess', { title: 'Test Chess' });
});

module.exports = router;
