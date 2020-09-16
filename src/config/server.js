/**
 *  @version 1.0.0
 *  @author Simplapp - Hans Castellar
 *  @description Configuracion General del servidor
 *   En este archivo se fusionan todas las dependencias y middlewares de la api
 */

const express = require("express");
const JWT = require("jsonwebtoken");
//Modulos de Terceros
var session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const passport = require("passport");
var cors = require("cors");

// Initializations
const app = express();
const config = require("./config");

//Settings
app.set("port", process.env.APP_PORT || 3002);

//Middlewares
app.use(cors(config.application.cors.server)); // carga cabeceras especiales CORS con la white list
app.use(express.urlencoded({extended: true})); //Entender datos de formularios
app.use(morgan("dev"));
app.use(express.json()); //convertir request json a objets js
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(require("../routes/api"));

//Static Files
module.exports = app;
