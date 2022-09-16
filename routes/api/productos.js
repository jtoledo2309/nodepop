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
    const tag = req.query.tag;

    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;

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

    if (tag) {
      filtro.etiquetas = tag;
    }

    const productos = await Producto.lista(filtro, skip, limit, sort);

    res.json({ results: productos });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/en_query_string",
  [
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

//OBTENER UN JSON CON LOS TAGS EXISTENTES
router.get("/etiquetas", async (req, res, next) => {
  const productos = await Producto.lista();

  const etiquetasLista = contarTags(productos);

  res.json({ tags: etiquetasLista });
});

function contarTags(productos) {
  let listaTags = [];
  productos.forEach((producto) => {
    for (let i = 0; i < producto.etiquetas.length; i++) {
      if (!listaTags.includes(producto.etiquetas[i])) {
        listaTags.push(producto.etiquetas[i]);
      }
    }
  });
  return listaTags;
}

module.exports = router;
