const Jwt =  require('jsonwebtoken')
const conexion = require('../config/conexion')
const bcrypt = require('bcrypt');
const {SignUpSchema, SigninSchema,ModifyPasswordSchema, ModifyUserSchema}= require('../validators/profile.validators');


require('dotenv').config()

// Mostrar Todos
function GetAll(req, res) {
    try {
        let sql = 'select * from Person';

        conexion.query(sql, (err, rows, fields) => {
          if (err)
            throw err;
          else {
            res.json(rows);
          }
        });
    } catch (error) {
        return res.status(500).json({error});
    }
 
}

// Leer Usuario
function Get(req,res){
    try { 
        const {id} = req.params
        let sql = 'select * from tb_user where id = ?'
        conexion.query(sql,[id],(err,rows,fields)=>{
            if(err) throw err;
            else{
                res.json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error});
    }
   
};

// Agregar Usuario
async function SignUp(req,res,next){
  try {

    
    await SignUpSchema.validateAsync(req.body)

    const {Name, lastname, phone, email, Password} = req.body

    let sqlEmail = `select id,Name,email from Person where email = ?`;

    conexion.query(sqlEmail,email, async(err,rows,fields)=>{
      if(err) throw err;
      if(rows[0]=== undefined){
        const BcryptPassword = await bcrypt.hash(Password,10)

        let sql = `insert into Person (Name, lastname, phone, email, Password) values ('${Name}','${lastname}', '${phone}', '${email}', '${BcryptPassword}')`
        console.log(sql);
        conexion.query(sql, (err,rows,fields)=>{
            if(err) throw err;
            else{
                res.json({status: 'Usuario Agregado'})
            }
        })
      }
      else if(rows[0].email=email){
        res.status(400).json({Mesage: 'email registered'});
      }
  })   
        
  } catch (error) {

    if(error.isJoi===true) Value = error.status=422;

    next(error);
    
    return res.status(Value).json({error})

  } 
};

// Eliminar Usuario
function DeleteUser (req,res){
    try {
        
    const {id} = req.params
    let sql = `delete from Person where id = '${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Eliminado'})
        }
    })
    } catch (error) {
        return res.status(500).json({error})
    }
};


// Modify User
async function ModifyUser(req,res){
    try {

        await ModifyUserSchema.validateAsync(req.body)
        
    const {id} = req.params
    const{Name, lastname, phone, email}= req.body
    let sqlPassword = `select Password from Person where id=${req.params.id}`;
    conexion.query(sqlPassword,[id],(err,rows,fields)=>{
        
        if(err ) throw err;

        const BcryptPassword= rows[0].Password;
        
        bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{

            let sqlId =   `update Person set Name ='${Name}',lastname = '${lastname}',phone = '${phone}', email = '${email}' where id = '${id}'`
            if(err) throw err;  
            if(hash){
                conexion.query(sqlId,(err,rows,fields)=>{
                    if(err) throw err;
                    
                    res.status(201).json({message:"User modify in successful"})
                })
            }else{
                console.log("Password Incorrect");
                res.status(401).json({message:"Password Incorrect"})
            }
        })
    
    })
    } catch (error) {
        if(error.isJoi===true) Value = error.status=422;

        next(error);

        return res.status(Value).json({error})
    }
};

// Modify Password
async function ModifyPassword(req,res,next){
    try {
        await ModifyPasswordSchema.validateAsync(req.body)
        
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
                
                    })
                }else{
                
                    console.log("Password Incorrect");
                
                    res.status(401).json({message:"Password Incorrect"})
                }
            })
        
    })   
    } catch (error) {
        if(error.isJoi===true) Value = error.status=422;

        next(error);

        return res.status(Value).json({error})
    }
};


// Login
async function SignIn(req,res,next){
    try {
    
    await SigninSchema.validateAsync(req.body)
       
    
    const email = req.body.email

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
                        const Token = Jwt.sign({email},process.env.SecretJWT,{
                            expiresIn:3600
                        })
                        console.log("Sign in successful");
                        res.status(201).json({message:"Sign in successful",Token:Token})
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
    } catch (error) {
        if(error.isJoi===true) Value = error.status=422;

        next(error);
    
        return res.status(Value).json({error})
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