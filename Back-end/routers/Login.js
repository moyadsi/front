const express = require('express');
const { LoginRouter } = require('.');
//Configurar rutas exportarlas e importarlas
const router = express.Router();

// Ruta que recibe nun formulario de registro
router.post('/', function (req, res) {
    const {email,password}=req.body;
    return res.status(200).json({"Status": "Bienvenido",  email: email});
  });



module.exports = router;