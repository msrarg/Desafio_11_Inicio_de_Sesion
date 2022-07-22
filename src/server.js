require("dotenv/config");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const storeMongo = require("connect-mongo");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const passport = require("passport");
const routerAuth = require("./routes/routerAuth");

const server = express();
require("./config/passport");

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "../views/layouts"),
    defaultLayout: "index",
    extname: ".hbs",
  })
);
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "hbs");

server.use(cookieParser());
const mUri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const mOptions = { useNewUrlParser: true, useUnifiedTopology: true };
server.use(
  session({
    store: storeMongo.create({
      mongoUrl: mUri,
      mongoOptions: mOptions,
    }),
    secret: "c0d3R",
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600 * 1000 },
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use("/", routerAuth);
server.use((req, res) => {
  const path = req.originalUrl;
  const metodo = req.method;
  res.status(404).render("error404", { ruta: path, metodo: metodo });
});

module.exports = server;
