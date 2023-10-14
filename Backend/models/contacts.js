'use strict'

import mongoose from "mongoose";
var Schema= mongoose.Schema;

var ContactSchema= Schema({
    nombre: String,
    apellidos: String,
    movil: Number,
    direccion: String,
    poblacion: String,
    c_postal: String,
    provincia: String,
    email: String,
    f_nacimiento: Date
}, {
    versionKey: false
});

export default mongoose.model('Contactos', ContactSchema);