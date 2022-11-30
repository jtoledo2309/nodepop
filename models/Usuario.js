"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

usuarioSchema.statics.hashPassword = function (simplePassword) {
  return bcrypt.hash(simplePassword, 7);
};

usuarioSchema.methods.comparePassword = function (simplePassword) {
  return bcrypt.compare(simplePassword, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
