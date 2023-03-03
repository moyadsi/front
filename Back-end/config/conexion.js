const mysql = require('mysql2');
require('dotenv').config()

const conexion = mysql.createConnection({
    host:'localhost'||process.env.hostNumber,
    user:process.env.user||'root',
    password:'' || process.env.password,
    database:'MetAnimation'
});

conexion.connect((err)=>{
    if(err){
        console.log('Ha ocurrido un error' + err)
    }
    else{
        console.log('La base de datos se conecto')
    }
});

module.exports=conexion;