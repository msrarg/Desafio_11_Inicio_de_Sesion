const socket = io.connect();

document.getElementById('btnProductoEnviar').addEventListener('click', function (e) {
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('nombre').value)) {
        showError('nombre', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('precio').value)) {
        showError('precio', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('foto').value)) {
        showError('foto', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        const producto = {
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            foto: document.getElementById('foto').value,
        }

        document.getElementById('form_producto').reset();
        socket.emit('new-product', producto);
    }
});

socket.on('productos', productos => {
    generarTablaProductos(productos);
});

const generarTablaProductos = (items) => {
    fetch('partials/template.hbs')
        .then(response => response.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ items })
            document.getElementById('productos').innerHTML = html
        })
}

document.getElementById('btnMensajeEnviar').addEventListener('click', () => {
    cleanErrors();
    let form_validation = true;

    if (!isRequired(document.getElementById('usermail').value)) {
        showError('usermail', 'Este es un campo requerido');
        form_validation = false;
    }

    if (!isRequired(document.getElementById('mensaje').value)) {
        showError('mensaje', 'Este es un campo requerido');
        form_validation = false;
    }

    if (form_validation){
        const mensaje = {
            author:{
                id: document.getElementById('usermail').value,
                nombre: document.getElementById('nombre_usuario').value,
                apellido: document.getElementById('apellido').value,
                edad: document.getElementById('edad').value,
                alias: document.getElementById('alias').value,
                avatar: document.getElementById('avatar').value
            },
            text:document.getElementById('mensaje').value,
            fecha: new Date().toLocaleString()
        }

        document.getElementById('form_mensaje').reset();
        document.getElementById('mensaje').focus();

        socket.emit('new-message', mensaje);
    }
});


socket.on('mensajes', mensajes => {
    generarTablaMensajes(mensajes);
});

const generarTablaMensajes = (mensajes) => {

    const authorSchema = new normalizr.schema.Entity('authors')
    const messageSchema = new normalizr.schema.Entity('mensajes', {
      author: authorSchema,
    },{idAttribute:'_id'})
    const global = new normalizr.schema.Entity('global', {
      messages: [messageSchema],
    })    
    
    const dataDeno = normalizr.denormalize(mensajes.result,global,mensajes.entities)

    const porcentajeReduccion = Math.ceil(
        (JSON.stringify(mensajes).length * 100) / JSON.stringify(dataDeno).length
        )
    
    document.getElementById('porcentaje').innerHTML = porcentajeReduccion;

    const html = dataDeno.messages.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author.id}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.text}</i>
                <img style="width: 30px; border-radius: 100%" src="${mensaje.author.avatar == '' ? 'https://www.gravatar.com/avatar/' : mensaje.author.avatar  }">
            </div>
        `)
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html
}
