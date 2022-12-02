var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionAuth = require("./lib/sessionAuthMiddleware");
const i18n = require("./lib/i18nConfigure");
const LoginController = require("./routes/loginController");
const PrivadoController = require("./routes/privadoController");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.locals.title = "Nodepop";

require("./lib/connectMongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//RUTA DEL API
app.use("/api/productos", require("./routes/api/productos"));

app.use(i18n.init);

//RUTAS DE LA WEB

const loginController = new LoginController();
const privadoController = new PrivadoController();

app.use(
  session({
    name: "nodepop-session",
    secret: "LB[CIouNKQ1xDq5",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", require("./routes/index"));
app.use("/change-locale", require("./routes/change-locale"));
app.use("/products", require("./routes/products"));

app.get("/login", loginController.index);
app.post("/login", loginController.post);
app.get("/logout", loginController.logout);
app.get("/privado", sessionAuth, privadoController.index);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    err.status = 422; // error de validación
    const errorInfo = err.array({ onlyFirstError: true })[0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.render("error");
});

module.exports = app;
