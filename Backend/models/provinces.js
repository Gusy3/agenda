'use strict'

import mongoose from "mongoose";
var Schema = mongoose.Schema;

var ProvinceSchema= Schema({
    nombre: String
}, {
    versionKey: false
});

export default mongoose.model('Provincias', ProvinceSchema);