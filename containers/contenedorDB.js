class ContenedorDB {
    constructor(knex, table){
        this.knex = knex;
        this.table = table;
    }
    async getAll() {
        try{
            return this.knex.from(this.table).select('*')
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async save(item) {
        try{
            await this.knex(this.table).insert(item)
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

module.exports = ContenedorDB;