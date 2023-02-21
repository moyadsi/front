const express = require('express');
const { RegisterRouter } = require('.');
const {queryDB} = require('../db')

//Configurar rutas exportarlas e importarlas
const router = express.Router();

// Ruta que recibe nun formulario de registro
router.post('/', async function (req, res) {
    const {password,phone,email,nombres,apellidos,ciudad}=req.body
    await queryDB(`INSERT INTO persona(Id,name1,lastname,celphone,email,passwords,state,date1) VALUES (5, "Paola", "Criales",3002507458,"paolacriales@gmail.com","Sena2024",true,"1988-07-18")`);
    return res.status(200).json({"Status": "registrado", nombres: nombres, apellidos: apellidos, email: email, ciudad: ciudad});
  });
module.exports = router;