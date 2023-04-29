const conexion = require('../config/conexion')
const nodemailer = require('nodemailer')
require('dotenv').config()


const PostEmailToken = async(req,res)=>{
    try{
        
        function token(){
            min = Math.ceil(000000);
            max = Math.floor(999999);
            return Math.floor(Math.random() * (max - min) + min)
        }
        
        const Token =token()
        const {email} = req.body;
        let sqlName = `select Name from Person where Email="${email}"`
        let sqlTokenSave = `update EmailToken set Token = ${Token} where Email='${email}'`
        
        let identificadorTiempoDeEspera;

        function temporizadorDeRetraso() {
            identificadorTiempoDeEspera = setTimeout(TimeValidateToken, 900000);
        }
        const TimeValidateToken=(Token)=>{
            let sqlTokenTime= `call EmailTokenElminated('${email}')`
            conexion.query(sqlTokenTime,(err,rows,fieds)=>{
                if(err) throw err
                else{
                    console.log(rows[0],"Token Eliminated")
                }
            })
        }
        temporizadorDeRetraso()
        conexion.query(sqlName,async(err,rows,fields)=>{
            
            if(rows[0]==undefined){
                return res.status(404).json({Message:"User not found"})
            }
            const resultName = rows[0].Name
            conexion.query(sqlTokenSave,async(err,rows,fields)=>{
                
                if(err) throw err;

                const transporter = nodemailer.createTransport({
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    auth: {
                        user: 'MetAnimation@hotmail.com',
                        pass: 'bdfikmwwopfqilqk'
                    }
                });

                let info = await transporter.sendMail({
                    from:"metanimation@hotmail.com",
                    to:email,
                    subject:"Recuperar Contraseña de tu cuenta de MetAnimation",
                    text:"Has solicitado para recuperar tu contraseña de tu cuenta de MetAnimation",
                    html:`
                    <div>
                        <p>Hola ${resultName}</p>
                        <p>El token para restaurar tu contraseña es ${Token}</p>
                        <p>Recuerda que tienes una hora para poder cambiar tu contraseña</p>
                        <p>Tienes 15 minutos para recuperar la contraseña</p>
                    </div>`
                })
                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                res.json({message:"Revisa tu correo electronico"})
            })
        })
  } catch (err) {
        res.status(500).json({err})
    }
}

const ChangePasswordToken=(req,res)=>{
    try {
        const {email,token}=req.body;

        let SearchTokenEmailSQL = `select Token from EmailToken where Email='${email}' `
        conexion.query(SearchTokenEmailSQL,(err,rows,fields)=>{
            console.log(rows[0])
            if(token==rows[0].Token){
                //Se guarda el valor de la nueva Contraseña pasada por el usuario
                const{NewPassword}= req.body
                //Cadena para encontrar la contraseña por medio de la id
                let sqlPassword = `select Password from Person where Email='${email}'`;
                //Ejecucion de la cadena con el parametro id
                conexion.query(sqlPassword,[id],(err,rows,fields)=>{
                // si hay un error se cancela el procedimiento 
                if(err)  res.status(401).json({message:err});
                //se guarda la contraseña encontrada
                const BcryptPassword= rows[0].Password;
                    //se compara la contraseña pasada por el usuario con la que se encontro 
                    bcrypt.compare(req.body.Password,BcryptPassword,async(err,hash)=>{
                        //se guarda la contraseña si es verdadera con el metodo async
                        const PasswordEncrypted = await bcrypt.hash(NewPassword,10)
                        //cadena para poder actualizar la contraseña con el parametro de id
                        let sqlId =   `update Person set Password = '${PasswordEncrypted}'where id = '${id}'`
                        // si hay un error se cancela el procedimiento 
                        if(err)  res.status(401).json({message:err});
                        //si son igual la contrasela prosigue
                        if(hash){
                            //Ejecucion de la cadena para actualizar la contraseña
                            conexion.query(sqlId,(err,rows,fields)=>{
                                // si hay un error se cancela el procedimiento 
                                if(err)  res.status(401).json({message:err});
                                //si todo salio con exito se le manda un status 201 con el siguiente mensaje
                                res.status(201).json({message:"Password modify in successful"})
                                next()
                            })
                            //si las contraseñas no son iguales se le niega el acceso
                        }else{
                            res.status(401).json({message:"Password Incorrect"})
                        }
                    })
                })
        }else{
            res.json({message:"Token invalido"})
        }
    })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports={
    PostEmailToken,
    ChangePasswordToken
}