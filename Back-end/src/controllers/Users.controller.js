// librerias
const Jwt =  require('jsonwebtoken')
const conexion = require('../config/conexion')
const bcrypt = require('bcrypt');

// declaracion del .env 
require('dotenv').config()

// Mostrar Todos los usuarios
function GetAll(req, res) {
    try {
        // cadena del procedimiento Sql
        let sql = 'call GetAllUsers()';
        // Ejecución de la cadena SQl
        conexion.query(sql, (err, rows, fields) => {
            // Si hubo un error no se envia nada y se le pasa el codigo de status 404(not found)
            if(err) res.status(404).json({message:"Usuario no encontrado"});
            // si se encuentra algo se le pasa con el status 200
            else {
                res.json(rows[0]);
            }
        });
    } catch (error) {
        // Si hay un error por parte del servidor se le dira el error
        return res.status(500).json({error});
    }
 
}

// Obtener usuario por su CC
function Get(req,res){
    try { 
        // Declaracion de la Id que se la pasa a la cadena de SQl
        const id = req.params.id
        // Cadena del procedimiento Almacenado SQL
        let sql = 'call GetIdUser(?)'
        // Ejecucion de la cadena con la constante Id para buscar al usuario
        conexion.query(sql,[id],(err,rows,fields)=>{
            // Si hubo un error no se envia nada y se le pasa el codigo de status 404(not found)
            if(err) res.status(404).json({message:"Usuario no encontrado"});
            // si se encuentra algo se le pasa con el status 200
            else{
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        // Si hay un error por parte del servidor se le dira el error
        return res.status(500).json({error});
    }
   
};

// Agregar Usuario
async function SignUp(req,res,next){
  try {
    //Declaracion de las variables que se la pasaran a la cadena de SQL
    const {Cedula,Nombre,Apellido,Celular,Email,Password,rol,rolAd} = req.body
    // Cadena Sql para verificar que el email no sea repetido
    let sqlEmail = `call GetEmailUser(?)`;
    //ejecución de la cadena sql con la constante de Email
    conexion.query(sqlEmail,[Email], async(err,rows,fields)=>{
        // si hay un error se cancela el procedimiento
        if(err) res.status(400).json({message:err});
        //Si no hay un email igual se ejecuta las siguientes cadenas
        if(rows[0]==''){
            //constante para guardar la encryptacion de la contraseña pasada por el usuario
            const BcryptPassword = await bcrypt.hash(Password,10)
            //Cadena de sql para Guardar 
            let sql = `call SavePerson(?,?,?,?,?,?,?,?)`
            // Cadena Sql para verificar la CC no este repetida
            let sqlId = `call GetIdValidacionUser(?)`
            //Ejecucion de la cadena de verificacion de CC con la constante Cedula
            conexion.query(sqlId,[Cedula],(err,rows,fields)=>{
                    // Guardando el resultado de la ejecucion de la cadena
                    const idTemp = rows[0]
                    const Id = idTemp[0]
                    // si hay un error se cancela el procedimiento
                    if(err)  res.status(400).json({message:err});
                    // Verificacion si no existe ninguna CC 
                    if(Id==undefined){
                        // Ejecucion de la cadena para guardar con los valores pasados por el usuario
                        conexion.query(sql,[Cedula,Nombre, Apellido, Celular, Email, BcryptPassword,rol,rolAd], (err,rows,fields)=>{
                            // si hay un error se cancela el procedimiento
                            if(err)  res.status(400).json({message:err});
                            else{
                                // si no hubo un error se le manda el mensaje con exito
                                res.status(201).json({status: 'Usuario Agregado'})
                                next()
                            }
                        })
                    }
                    // si existe una CC ya existente,se le manda un error 400 
                    else if(Id.id == Cedula) res.status(400).json({message:"Cedula actualmente registrada"})
            })
        }
        else if(rows[0].email=Email){
        //si existe un Email ya existente,se le manda un error 400 
        res.status(400).json({Mesage: 'email registered'});
      }
  })
}catch (error) {
    // Si ocurrio un error por parte del servidor
    return res.status(500).json({error})
  } 
};

// Eliminar Usuario
function DeleteUser (req,res,next){
    try {
        // Declaracion de la id pasada por el usuario
        const {id} = req.params
        // Cadena del procedimiento Sql
        let sql = `delete from Person where id = '${id}'`
        // Ejecucion de la cadena con el parametro
        conexion.query(sql,(err,rows,fields)=>{
            // si hay un error se cancela el procedimiento
            if(err)  res.status(400).json({message:err});
            //si no hubo un error prosigue para finalizar el cadena
            else{
                res.status(200).json({message: 'Usuario Eliminado'})
                next()
            }
        })
    } catch (error) {
        // Si ocurrio un error por parte del servidor
        return res.status(500).json({error})
    }
};


// Modify User
async function ModifyUser(req,res,next){
    try {
        
        const {id} = req.params
        const{Name, lastname, phone, email,Rol}= req.body
        let sqlPassword = `select Password from Person where id=${req.params.id}`;
        let SqlSearchEmail = `select email from person where email =  ?`
        let SqlSearchConfirmed=`select email from person where id = ${req.params.id}`

    conexion.query(SqlSearchConfirmed,(err,rows,fields)=>{

        if(err)throw err;

        const SearchConfirmed = rows[0].email;

        conexion.query(SqlSearchEmail,[email],(err,rows,fields)=>{

            if(err)throw err;

            const SearchEmail =rows[0];

            if(SearchEmail==undefined){       
                conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        
                    if(err ) throw err;
            
                    const BcryptPassword= rows[0].Password;
                    
                    bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
            
                        let sqlId =   `update Person set Name ='${Name}',lastname = '${lastname}',phone = '${phone}', email = '${email}',Rol='${Rol}' where id = '${id}'`
                        
                        if(err) throw err;  
                        if(hash){
                            conexion.query(sqlId,(err,rows,fields)=>{
                                if(err) throw err;
                                
                                res.status(201).json({message:"User modify in successful"})
                                next()
                            })
                        }else{
                            console.log("Password Incorrect");
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            }
            else if(SearchConfirmed==req.body.email){
                
                conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        
                    if(err ) throw err;
            
                    const BcryptPassword= rows[0].Password;
                    
                    bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
            
                        let sqlId =   `update Person set Name ='${Name}',lastname = '${lastname}',phone = '${phone}', email = '${email}',Rol='${Rol}' where id = '${id}'`
                        
                        if(err) throw err;  
                        
                        if(hash){

                            conexion.query(sqlId,(err,rows,fields)=>{
                                
                                if(err) throw err;
                                
                                res.status(201).json({message:"User modify in successful"})
                                next()
                            })
                        }else{

                            console.log("Password Incorrect");

                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            }else if(SearchEmail!=SearchConfirmed){

                res.status(400).json({message:"Email Unvalid changed"})
                
            }
        })
    })
} 
catch (error) {
        return res.status(400).json({error})
    }
};

// Modify Password
async function ModifyPassword(req,res,next){
    try {
        
        
        const {id} = req.params
    
        const{NewPassword}= req.body
    
        let sqlPassword = `select Password from Person where id=${req.params.id}`;
    
        conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        
        if(err ) throw err;

            const BcryptPassword= rows[0].Password;
            
            bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{

                const PasswordEncrypted = await bcrypt.hash(NewPassword,10)

                let sqlId =   `update Person set Password = '${PasswordEncrypted}'where id = '${id}'`

                if(err) throw err;  
                
                if(hash){
                    conexion.query(sqlId,(err,rows,fields)=>{
                        if(err) throw err;
                        
                        res.status(201).json({message:"Password modify in successful"})
                        next()
                    })
                }else{
                
                    console.log("Password Incorrect");
                
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        
    })   
    } catch (error) {
        return res.status(400).json({error})
    }
};


// Login
async function SignIn(req,res,next){
    try {   
    
    const email = req.body.email

    let sqlRol = `select Rol,RolAd from Person where email = '${email}'`

    conexion.query(sqlRol,(err,rows,fields)=>{
        
        if(err) throw err;
        const Rol = rows[0].Rol;
        const RolAd = rows[0].RolAd;
        console.log(RolAd);
            
        let sql = 'select Name, id from Person where email =  ?'
        let sqlP = 'select Password from Person where email =  ?'
        
        conexion.query(sql,[email],(err, rows,fields) => {
            
            if(err) throw err;
            if(rows.length == 1){
                console.log("authorized");
                conexion.query(sqlP,[email],(err,rows)=>{
                    const Password = rows[0].Password
            
                    bcrypt.compare(req.body.Password,Password,(err,hash)=>{
                        if(err) throw err;  
                        if(hash){
                            const TokenEmail = Jwt.sign({email},process.env.SecretJWT,{
                                expiresIn:3600
                            })
                            const TokenRol = Jwt.sign({RolAd},process.env.SecretJWT,{
                                expiresIn:3600
                            })
                            console.log("Sign in successful");
                            if(RolAd=='Administrador'){
                                next()
                                return res.status(201).json({message:"Sign in successful Administrador",Token:TokenRol})
                            }
                            if(RolAd=='Moderator'){
                                next()
                                return res.status(201).json({message:"Sign in successful Moderator",Token:TokenRol})
                            }
                            else{
                                next()
                                return res.status(200).json({message:"Sign in successful",Token:TokenEmail})
                            }
                        }else{
                            console.log("Password Incorrect");
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
            }else{
                
                res.status(401).json({response:"User does not exist"})

            }
        })
    })
        } catch (error) {
            return res.status(400).json({error})
        }
};

module.exports = {
    Get,
    GetAll,
    ModifyPassword,
    SignIn,
    SignUp,
    ModifyUser,
    DeleteUser
}