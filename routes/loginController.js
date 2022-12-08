"use strict";

const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.email = "";
    res.render("login");
  }

  //Para el website
  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email: email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = res.__("Invalid credentials");
        res.locals.email = email;
        res.render("login");
        return;
      }

      req.session.usuarioLogado = usuario._id;

      res.redirect("/privado");
    } catch (err) {
      next(err);
    }
  }

  //Para el api
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email: email });

      if (!usuario || !(await usuario.comparePassword(password))) {
        res.status(401);
        res.json({ error: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: "4d",
      });

      res.json({ token: token });
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }
}

module.exports = LoginController;
