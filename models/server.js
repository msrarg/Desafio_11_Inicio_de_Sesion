require('dotenv').config();
// require("dotenv/config");
const path = require("path");

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const hbs = require('handlebars');
const { engine } = require("express-handlebars");

/* Persistencia con MongoDB */
const MongoStore = require('connect-mongo');

class Server {
    constructor(){
        this.app  = express();
        this.hbs  = hbs;
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Application's Routes
        this.routes();
    }
   
    middlewares(){

        // Express HBS engine
        this.app.engine(
            "hbs",
            engine({
                layoutsDir: path.join(__dirname, "../views/layouts"), // Ruta de los layouts
                defaultLayout: "index", // Layout por defecto
                extname: ".hbs", // Extensión de los archivos
            })
        );
        this.app.set("view engine", "hbs");
        this.app.set("views", path.join(__dirname, "../views"));
        // this.hbs.registerPartials(__dirname + '/views/partials', function(err) {});

        // Cookie middlewares
        this.app.use(cookieParser());

        /*
        // Usando connect-mongo
        this.app.use(session({
            store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie:{maxAge: 60000}
        }));
        */

        // Usando Mongo Atlas
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_ATLAS_URI, 
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true}
            }),
            key: process.env.SESSION_KEY, // nombre de la cookie
            secret: process.env.SESSION_SECRET, // Secreto para encriptar la sesión
            resave: false, // No guardar la sesión si no se ha modificado
            saveUninitialized: false, // No guardar la sesión si no se ha iniciado
            rolling: true, // cada vez que se abre la sesión se actualiza el tiempo de expiración
            cookie:{maxAge: 600000} // 10 minutos
        }));
   
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        // this.app.use(express.static('public'));
        this.app.use(express.static(path.join(__dirname, "/views")));
        // this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
    }

    routes(){
        const sessionCheck = (req, res, next) => {
            if (req.session.user && req.cookies.user_sid) {
              res.redirect("/dashboard");
              return;
            }
            next();
          };
          
          this.app.get("/", sessionCheck, (req, res) => {
            res.redirect("/login");
          });
          
          this.app.get("/login", sessionCheck, (req, res) => {
            res.render("login");
          });
          
          this.app.post("/login", (req, res) => {
            const { nombre } = req.body;
            req.session.user = { username: nombre };
            res.redirect("/dashboard");
          });
          
          this.app.get("/dashboard", (req, res) => {
            if (req.session.user && req.cookies.user_sid) {
              res.render("dashboard", { userName: req.session.user.username });
            } else {
              res.redirect("/login");
            }
          });
          
          this.app.post("/logout", (req, res) => {
            if (req.session) {
              const userName = req.session.user.username;
              req.session.destroy(() => {
                req.session = null;
                res.render("logout", { userName });
              });
            }
          });  

        // respond with 404 when no matching route is found
        this.app.use('*', (req, res) => {
            const path   = req.originalUrl;
            const method = req.method;
            res.status(404).json({
                    error: -2,
                    descripcion:`La ruta ${path} y/o el método ${method} no se encuentran implementados`
            });
        });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server up on port: ${this.port}`);
        });
    }
}

module.exports = Server;
