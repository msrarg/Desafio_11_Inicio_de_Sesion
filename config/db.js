const mongoose = require('mongoose');

const options_sqlite = {
    client:'sqlite3',
    connection:{
        filename:'./DB/ecommerce.sqlite',
    },
    useNullAsDefault:true,
}

const options_mariadb = {
    client:'mysql',
    connection:{
        host: process.env.MARIADB_HOST || "127.0.0.1",
        user:process.env.MARIADB_USER || "root",
        password:process.env.MARIADB_PASSWORD || "",
        database:process.env.MARIADB_DATABASE || "ecommerce"
    }
}

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}

module.exports = {
    options_sqlite,
    options_mariadb,
    dbConnection,
}