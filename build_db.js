require('dotenv').config();

if (!process.env.MARIADB_DATABASE) {
    console.error("**VARIABLES DE ENTONRNO NO DEFINIDAS. UTILIZAR ARCHIVO .env.sample como referencia**");
    return process.exit(1);
}

const {options_sqlite,options_mariadb} = require("./config/db")
const sqlite = require('knex')(options_sqlite);
const mariadb = require('knex')(options_mariadb);



(async() =>{
    try {
        /*
        Por el momento no se utiliza esto porque se despliega con Mongo
        const exists_mensajes = await sqlite.schema.hasTable('mensajes')
        if (!exists_mensajes) {
            console.log('Se crea la tabla mensajes')
            await sqlite.schema.createTable('mensajes', table => {
                table.increments('id').primary().notNull(),
                table.string('usermail',250).notNull(),
                table.string('mensaje',300).notNull(),
                table.string('fecha',100)
            })
        }
        */

        // Solo se utiliza esta conexion sin la base seleccionada para la creación
        const create_connection = require('knex')({
            client:options_mariadb.client,
            connection:{
                host: options_mariadb.connection.host,
                user:options_mariadb.connection.user,
                password:options_mariadb.connection.password
            }
        });
        await create_connection.raw('CREATE DATABASE IF NOT EXISTS ??', options_mariadb.connection.database);
        await create_connection.destroy();


        const exists_productos = await mariadb.schema.hasTable('productos')
        if (!exists_productos) {
            console.log('Se crea la tabla productos')
            await mariadb.schema.createTable('productos', table => {
                table.increments('id').primary().notNull(),
                table.string('nombre',100).notNull(),
                table.float('precio').notNull(),
                table.string('foto',200)
            })
        }
        await sqlite.destroy();
        await mariadb.destroy();
    } catch (error) {
        console.log(error)
    }

})();
