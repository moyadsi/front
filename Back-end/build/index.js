"use strict";

var morgan = require('morgan');
var express = require('express');
var cors = require('cors');
require('dotenv').config();
var port = process.env.port || 3000;

// Express
var app = express();
app.use(cors());

// Morgan
app.use(morgan('dev'));

//Admitir
app.use(express.json());

//Configuracion
app.set('port', port);

// Rutas
app.use('/api/Profile', require('./routes/Profile.router'));

//Iniciar express
app.listen(app.get('port'), function (error) {
  if (error) {
    console.log('Error al iniciar servidor' + error);
  } else {
    console.log('Servidor iniciado en el puerto: ' + port);
  }
});