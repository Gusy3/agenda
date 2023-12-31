'use strict'

// Cargar módulos de node para crear servidor
import express from 'express';
import bodyParser from 'body-parser';

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
import contact_routes from "./routes/contacts.js";
import province_routes from "./routes/provinces.js";

//MiddLewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', contact_routes);
app.use('/api', province_routes);

// Exportar el módulo (fichero actual)
export default app;