const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const UserSchema = Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
})

module.exports = model('User', UserSchema)
