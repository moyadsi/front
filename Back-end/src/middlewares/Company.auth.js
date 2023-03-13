const Jwt = require('jsonwebtoken');
const conexion = require('../config/conexion');
require('dotenv').config();

const verifyTokenEmailCompany = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select EmailCompany from Company where Id_Company = ${req.params.id}`

    let sqlEmail = `select EmailCompany from Company where EmailCompany = ?`

    let FoundEmail = await conexion.query(sql2,[decode.EmailCompany],async (err,rows)=>{
      console.log(rows);
      const validateEmail = await conexion.query(sqlEmail,[decode.EmailCompany])

      if(validateEmail.values!=rows[0].EmailCompany){
        console.log(validateEmail.values);
        console.log(FoundEmail.values);
  
        return res.status(401).json({message:"Email validation failed"})
  
      }
      else{
        next()
      }
    })
    
  } catch (error) {
    return res.status(400).json({message:"Unathorized"})
  }
}

const verifyTokenPasswordCompany = async (req,res,next)=>{
  try {
    
    const token = req.headers['x-access-token'];
    
    if(!token) return res.status(401).json({message: 'No token provided'})

    const decode = Jwt.verify(token,process.env.SecretJWT)

    let sql2 = `select EmailCompany from Company where Id_Company = ${req.params.id}`

    let sqlEmail = `select EmailCompany from Company where EmailCompany = ?`

    let FoundEmail = await conexion.query(sql2,[decode.EmailCompany],async (err,rows)=>{
      console.log(rows);
      const validateEmail = await conexion.query(sqlEmail,[decode.EmailCompany])

      if(validateEmail.values!=rows[0].email){
        console.log(validateEmail.values);
        console.log(FoundEmail.values);
  
        return res.status(401).json({message:"Profile validation failed"})
  
      }
      else{
        next()
      }
    })
    
  } catch (error) {
    return res.status(400).json({message:"Unathorized"})
  }
}



module.exports={
  verifyTokenEmailCompany,
  verifyTokenPasswordCompany
}