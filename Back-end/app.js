const express = require('express');
// Politicas para Request intercambio informacion entre servidores
const cors = require('cors');
// Para visualizar en consola los request
const morgan = require('morgan');
// Variables de entorno almacenan info
require('dotenv').config();

//Inicializar la aplicacion
const app = express();
const port = process.env.PORT || 4000 ;

// Middleware configuracion del servidor
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Importar Rutas
const {RegisterRouter} = require('./routers');
const {LoginRouter} = require('./routers');
const { queryDB } = require('./db');

// Configurar rutas
app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);

console.log(queryDB)

// Inicializar el servidor
app.listen(port, ()=> {
    console.log("Puerto " + port);
})


