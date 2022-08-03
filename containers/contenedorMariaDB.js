const ContenedorDB = require("./contenedorDB");
const {options_mariadb:options} = require("../config/db")
const knex = require('knex')(options);

class ContenedorMariaDB extends ContenedorDB {
    constructor() {
        super(knex,'productos');
    }
}

module.exports = ContenedorMariaDB