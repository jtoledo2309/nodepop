const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    name: String,
    forSale: Boolean,
    precio: Number,
    //imagen: Image,
    etiquetas: [String]
})

const Producto = mongoose.model('Producto', productoSchema)

module.exports = Producto;