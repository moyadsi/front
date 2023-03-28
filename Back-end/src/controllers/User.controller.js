/* // librerias
const Jwt =  require('jsonwebtoken')
const conexion = require('../config/conexion')
const bcrypt = require('bcrypt');
const nodemailer= require("nodemailer")

// declaracion del .env 
require('dotenv').config()


const EmailPassword = async(req,res)=>{
  try {
    const {email}=req.body;
    let sqlEmail = `select email from Person where email='${req.body.email}'`
    conexion.query(sqlEmail,(err,rows,fields)=>{
      const EmailFound = rows[0]
      if (err) throw err;
      if(EmailFound==undefined) return res.status(404).json({message:"Email not found"})
      else{
        res.json("xd")
      }
    })
} catch (error) {
  }
}

module.exports={
  EmailPassword
} */