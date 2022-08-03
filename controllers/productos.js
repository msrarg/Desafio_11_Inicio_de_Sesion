const fs = require('fs')
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch');

faker.locale = 'es';
const productosGetTest = (req, res) => {
    const output = [];
    for (let i = 0; i < 5; i++) {  
        
        output.push({
            'nombre':faker.commerce.product(),
            'precio': faker.commerce.price(),
            'foto': faker.image.technics(240,240,true)
        });
    }

    res.status(200).json(output);
}

const productosGetTestView = async (req, res) => {
    fetch('http://localhost:8080/api/productos-test')
    .then(response => response.json())
    .then(items => {
        res.render('tabla',{items})
    })
}

module.exports = {
    productosGetTestView,
    productosGetTest,
}

