const mysql = require('mysql');
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_meta'
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