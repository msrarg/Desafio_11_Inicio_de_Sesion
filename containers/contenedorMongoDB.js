const Mensaje = require('../models/Mensaje.js');

class ContenedorMongoDB {

    constructor(model = Mensaje){
        this.model = model;
    }

    async getAll() {
        try{
            const all = await this.model.find({});
            return all;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async save(item) {
        try{
            const id = await this.model.create(item);
            return id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

module.exports = ContenedorMongoDB;