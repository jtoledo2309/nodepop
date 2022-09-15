var express = require('express');
const Producto = require('../models/Productos');
var router = express.Router();

/* GET para product page. */
router.get('/', async function(req, res, next) {

  res.locals.productos = await Producto.lista()

  res.render('products', { title: 'Productos Nodepop' });
});

module.exports = router;
