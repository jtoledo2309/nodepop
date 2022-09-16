const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  name: String,
  forSale: Boolean,
  precio: Number,
  imagen: String,
  etiquetas: [String],
});

productoSchema.statics.lista = function (filtro, skip, limit, sort) {
  const query = Producto.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);

  return query.exec();
};

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
