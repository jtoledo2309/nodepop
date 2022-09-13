var express = require('express');
var router = express.Router();

/* GET para product page. */
router.get('/', function(req, res, next) {
  res.render('products', { title: 'Productos Nodepop' });
});

module.exports = router;
