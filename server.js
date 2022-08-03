require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars')
const {engine} = handlebars;
const path = require('path');
const passport = require('passport');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser')

const { dbConnection } = require('./config/db');
const { baseSession } = require('./config/session.js');
const { initializePassport } = require('./config/passport.config.js');

const ContenedorMariaDB = require('./containers/contenedorMariaDB');
const ContenedorMongoDB = require('./containers/contenedorMongoDB');
const Normalizador = require('./models/Normalizador.js');
const normalizer = new Normalizador();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(baseSession)
initializePassport();
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/productos-test', require('./routes/productos'));
app.use('/',  require('./routes/auth.js'));
app.use(express.static(path.join(__dirname ,'public')));

app.engine(
  "hbs",
  engine({
      extname: ".hbs",
      defaultLayout: "layout.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

//Se instancian los contenedores que atenderan los mensajes y productos
const productos = new ContenedorMariaDB();
const mensajero = new ContenedorMongoDB();

(async () => {
    await dbConnection();
})();

io.on('connection', async socket => {
    console.log('Nueva conexión');

    socket.emit('productos',await productos.getAll());

    socket.on('new-product', async producto => {
        await productos.save(producto);
        io.sockets.emit('productos', await productos.getAll());
    })

    const mensajes = await mensajero.getAll();
    const data = normalizer.getDataNormalized(mensajes)

    socket.emit('mensajes', data);

    socket.on('new-message', async mensaje => {
        try {
            await mensajero.save(mensaje)    
        } catch (error) {
            console.log(error);
        }

        const mensajes = await mensajero.getAll();
        const data = normalizer.getDataNormalized(mensajes)

        socket.emit('mensajes', data);
    })
});

server.listen(process.env.PORT, () => {
    console.log(`Escuchando port: ${server.address().port}`); 
});

server.on('error', (err) => console.log(err));
