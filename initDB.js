"use strict";

const connection = require("./lib/connectMongoose");

const { Producto, Usuario } = require("./models");

async function main() {
  await initProductos();

  await initUsuarios();

  connection.close();
}

main().catch((err) => console.log("Hubo un error:", err));

async function initUsuarios() {
  const deleted = await Usuario.deleteMany();

  const inserted = await Usuario.insertMany([
    {
      email: "admin@test.com",
      password: await Usuario.hashPassword("1234"),
    },
    {
      email: "user@test.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);
}

async function initProductos() {
  const deleted = await Producto.deleteMany();

  const inserted = await Producto.insertMany([
    {
      name: "iphone",
      forSale: true,
      precio: 450,
      etiquetas: ["mobile"],
      imagen: "iphone.jpeg",
    },
    {
      name: "camiseta",
      forSale: false,
      precio: 25,
      etiquetas: ["lifestyle", "work"],
      imagen: "camiseta.jpeg",
    },
    {
      name: "coche",
      forSale: true,
      precio: 5000,
      etiquetas: ["motor"],
      imagen: "coche.jpg",
    },
  ]);
}
