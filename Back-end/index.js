const morgan = require('morgan')
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const port = process.env.port || 3000 ;

// Express
const app = express();
app.use(cors());

// Morgan
app.use(morgan('dev'))

//Admitir
app.use(express.json());

//Configuracion
app.set('port',port);

// Rutas
app.use('/api/Profile',require('./routes/routePerfil'))

//Iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar servidor' +error)
    }
    else{
        console.log('Servidor iniciado en el puerto: ' + port)
    }
})