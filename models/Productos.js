const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  name: String,
  forSale: Boolean,
  precio: Number,
  imagen: String,
  etiquetas: ["hola", "prueba"],
});

productoSchema.statics.lista = function (filtro, skip, limit) {
  const query = Producto.find(filtro);
  query.skip(skip);
  query.limit(limit);

  return query.exec();
};

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
