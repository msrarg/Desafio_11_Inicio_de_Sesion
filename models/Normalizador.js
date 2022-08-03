const { normalize, schema } = require('normalizr');

class Normalizador {

  /*
  Esto es un ejemplo de como llega un objeto
  {
    "author": {
        "id": "mail@gmail.com",
        "nombre": "Nombre",
        "apellido": "Apellido",
        "edad": "1",
        "alias": "Alias",
        "avatar": "url_del_avatar"
    },
    "_id": "62cdf0a0b0bd42588147bbed",
    "mensaje": "Mensaje",
    "fecha": "2022-07-12T22:07:28.172Z",
    "__v": 0
  }
  */

    getDataNormalized(data_to_normalize) {
        const messages = JSON.parse(JSON.stringify(data_to_normalize));
        const authorSchema = new schema.Entity('authors')
        const messageSchema = new schema.Entity('mensajes', {
          author: authorSchema,
        },{idAttribute:'_id'})
        const global = new schema.Entity('global', {
          messages: [messageSchema],
        })

        const data = { id: 'mensajes', messages }

        const dataNormalized = normalize(data, global)
        return dataNormalized;
    }
}

module.exports = Normalizador