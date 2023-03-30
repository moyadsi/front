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
        const {email} = req.body;
        const Token = token()
        let sqlName = `select Name from Person where Email="${email}"`
        let sqlTokenSave = `update EmailToken set Token = ${Token} where Email='${email}'`

        conexion.query(sqlName,async(err,rows,fields)=>{
            
            const resultName = rows[0].Name
            conexion.query(sqlTokenSave,async(err,rows,fields)=>{
                
                if(err) throw err;
                /* 
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'westley.schmidt84@ethereal.email',
                        pass: 'vsgcz2CdVDjs2nX5NT'
                    }
                }); */

                const transporter = nodemailer.createTransport({
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    auth: {
                        user: 'gian-5634@hotmail.com',
                        pass: ''
                    }
                });

                let info = await transporter.sendMail({
                    from:"MetAnimation@admin.net",
                    to:email,
                    subject:"Recuperar Contraseña de tu cuenta de MetAnimation",
                    text:"Has solicitado para recuperar tu contraseña de tu cuenta de MetAnimation",
                    html:`
                    <div>
                        <p>Hola ${resultName}</p>
                        <p>El token para restaurar tu contraseña es ${Token}</p>
                    </div>`
                })
                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                res.json(nodemailer.getTestMessageUrl(info))
            })
        })
  } catch (err) {
        res.status(500).json({err})
    }
}

module.exports={
    PostEmailToken
}