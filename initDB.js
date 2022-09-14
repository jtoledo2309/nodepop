'use strict'

const connection = require('./lib/connectMongoose')

const Producto = require('./models/Productos')

async function main(){

    await initProductos()

    connection.close()
}

main().catch(err => console.log('Hubo un error:', err))

async function initProductos(){

    const deleted = await Producto.deleteMany()

    const inserted = await Producto.insertMany([
        { name: 'iphone', forSale: true, precio: 450, etiquetas:['mobile']},
        { name: 'camiseta', forSale: false, precio: 25, etiquetas:['lifestyle', 'work']},
        { name: 'coche', forSale: true, precio: 5000, etiquetas:['motor']}      
 ])

}

