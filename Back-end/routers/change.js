const express = require('express');
const { RegisterRouter } = require('.');
//Configurar rutas exportarlas e importarlas
const router = express.Router();

// Ruta que recibe nun formulario de registro
router.post('/', function (req, res) {
    const {password, newpassword}=req.body;
    return res.status(200).json({"Status": "registrado",  password: password, newpassword: newpassword});
  });



module.exports = router;