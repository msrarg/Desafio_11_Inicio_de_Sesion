const ContenedorDB = require("./contenedorDB");
const {options_sqlite:options} = require("../config/db")
const knex = require('knex')(options);

class ContenedorSQLite extends ContenedorDB {
    constructor() {
        super(knex,'mensajes');
    }
}

module.exports = ContenedorSQLite