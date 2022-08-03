const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const MensajeSchema = Schema({
    author: {
        id: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
      },
      text: {type: String},
      fecha: {type: String}
});

module.exports = model('Mensaje', MensajeSchema);

