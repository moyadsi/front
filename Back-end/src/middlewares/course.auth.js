const Jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
require('dotenv').config();

const verifyTokenEmailModifyCouser = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    const tokenRol = req.headers['x-access-token-rol']
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select Email from person where id = ${req.params.id}`

    let sqlEmail = `select email from person where email = ?`

    let FoundEmail = conexion.query(sql2,[decode.email],(err,rows)=>{

      const validateEmail = conexion.query(sqlEmail,[decode.email])

      if(validateEmail.values[0]!=FoundEmail.values[0]){

        return res.status(401).json({message:"Email validation failed"})

      }
        return next()
    })
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:"Unathorized"})
  }
}