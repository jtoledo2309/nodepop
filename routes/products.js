var express = require("express");
const Producto = require("../models/Productos");
var router = express.Router();

/* GET para product page. */
router.get("/", async function (req, res, next) {
  const filtro = {};

  //Criterios del producto
  const name = req.query.name;
  const precio = req.query.precio;
  const venta = req.query.forSale;

  //Criterios para la pagina
  const skip = req.query.skip;
  const limit = req.query.limit;
  const sort = req.query.sort;

  if (name) {
    filtro.name = name;
  }

  if (precio) {
    filtro.precio = precio;
  }

  if (venta) {
    filtro.forSale = venta;
  }

  const productos = await Producto.lista(filtro, skip, limit, sort);

  res.render("products", { title: "Productos Nodepop", productos });
});

//Mostrar las etiquetas disponibles en la pagina
router.get("/etiquetas", async (req, res, next) => {
  const productos = await Producto.lista();

  console.log(productos);

  const etiquetasLista = contarTags(productos);

  res.send("Los tagas por los que puede filtrar: " + etiquetasLista);
});

function contarTags(productos) {
  let listaTags = [];
  productos.forEach((producto) => {
    for (let i = 0; i < producto.etiquetas.length; i++) {
      //if (!producto.etiquetas[i] in listaTags) {
      listaTags.push(producto.etiquetas[i]);
      // }
    }
  });
  return listaTags;
}

module.exports = router;
