const express = require("express");
const router = express.Router();
const { query, validationResult } = require("express-validator");
const Producto = require("../../models/Productos");
const basicAuth = require("../../lib/basicAuth");

//LISTAR PRODUCTOS
router.get("/", basicAuth, async (req, res, next) => {
  try {
    const filtro = {};

    //Add filtros
    const name = req.query.name;
    const precio = req.query.precio;
    const venta = req.query.forSale;

    const skip = req.query.skip;
    const limit = req.query.limit;

    //Condiciones para los filtros
    if (name) {
      filtro.name = name;
    }

    if (precio) {
      filtro.precio = precio;
    }

    if (venta) {
      filtro.forSale = venta;
    }

    const productos = await Producto.lista(filtro, skip, limit);

    res.json({ results: productos });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/en_query_string",
  [
    // validaciones
    query("orderby").isAlphanumeric().withMessage("must be alphanumeric"),
    query("solo").isNumeric().withMessage("must be numeric"),
  ],
  (req, res, next) => {
    validationResult(req).throw();
    console.log(req.query);
    const orderBy = req.query.orderby;
    const numero = req.query.solo;
    res.json({ result: true });
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;

    const producto = await Producto.lista({ _id: _id });

    res.json({ result: producto });
  } catch (error) {
    next(error);
  }
});

//ACTUALIZAR PRODUCTOS
router.put("/:id", basicAuth, async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const productoActualizado = await Producto.findOneAndUpdate(
      { _id: _id },
      data,
      { new: true }
    );

    res.json({ result: productoActualizado });
  } catch (error) {
    next(error);
  }
});

//CREAR NUEVOS PRODUCTOS
router.post("/", basicAuth, async (req, res, next) => {
  try {
    const dataNueva = req.body;

    console.log(req);
    const producto = new Producto(dataNueva);

    const nuevoProducto = await producto.save();

    res.json({ result: nuevoProducto });
  } catch (error) {
    next(error);
  }
});

//ELIMINAR PRODUCTOS
router.delete("/:id", basicAuth, async (req, res, next) => {
  try {
    const _id = req.params.id;

    const productoBorrado = await Producto.deleteOne({ _id: _id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
