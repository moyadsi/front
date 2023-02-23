require('./config/conexion');
const express = require('express');
//const cors = require('cors');
const { prependListener } = require('./config/conexion');
const port = (process.env.port || 3000);


// Express
const app = express();
//app.use(cors({origin: 'http://localhost:3000'}));

//Admitir
app.use(express.json())

//Configuracion
app.set('port',port)

// Rutas
app.use('/api',require('./rutas'))

//Iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar servidor' +error)
    }
    else{
        console.log('Servidor iniciado en el puerto: ' + port)
    }
})