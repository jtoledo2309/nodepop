const express = require('express')
const router = express.Router()
const {query, validationResult } = require('express-validator');
const Producto = require('../../models/Productos')

//LISTAR PRODUCTOS
router.get('/', async (req, res, next) => {
    try {
        const productos = await Producto.find()

        res.json( {results: productos})
    } catch(error){
        next(error)
    }

})

/*
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
*/

router.get('/:id', async (req, res, next) => {
    try {
        
        const _id = req.params.id

        const producto = await Producto.findOne({ _id:_id})

        res.json({ result: producto})

    } catch (error) {
        next(error);
    }
}) 


//ACTUALIZAR PRODUCTOS
router.put('/:id', async(req, res, next) => {
    try {
        
        const _id = req.params.id
        const data = req.body

        const productoActualizado = await Producto.findOneAndUpdate({_id: _id}, data, {new: true})

        res.json({ result: productoActualizado})


    } catch (error) {
        next(error)
    }
})


module.exports = router