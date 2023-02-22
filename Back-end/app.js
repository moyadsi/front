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

/*
var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express()
.use(cors({credentials: true, origin: 'http://localhost:4200'
}))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }));

//ruta que recibe un objeto json para registro
app.post('/register', function (req, res) {
  let name = req.body.names;
  let lastname = req.body.lastnames;
  let phone = req.body.phone;
  let email = req.body.email;
  let password = req.body.password;
  console.log(name, lastname, phone, email, password, req.header("Authorization"));
  return res.status(200).json({"Status": "ok registrado con json"});
});

app.listen(10101, function () {
  console.log('Example app listening on port 10101!');
}); */


