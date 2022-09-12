const express = require('express')
const router = express.Router()
const {query, validationResult } = require('express-validator');

router.get('/', (req, res, next) => {
    const productos = [
        { name: 'iphone', forSale: true, precio: 200, etiquetas: ['negro', '48gb']},
        { name: 'camiseta', forSale: true, precio: 10, etiquetas: ['blanco', 'manga larga']}
    ]
    res.json( {results: productos})
})

router.get('/en_query_string', [ // validaciones
  query('orderby').isAlphanumeric().withMessage('must be alphanumeric'),
  query('solo').isNumeric().withMessage('must be numeric'),
], (req, res, next)=> {
  validationResult(req).throw();
  console.log(req.query);
  const orderBy = req.query.orderby;
  const numero = req.query.solo;
  res.json({ result: true });
});


module.exports = router