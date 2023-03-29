const conexion = require('../config/conexion')
const nodemailer = require('nodemailer')
require('dotenv').config()


const PostEmailToken = async(req,res)=>{
    try{

        const {email} = req.body;

        let sqlName = `select Name from Person where Email="${email}"`

        conexion.query(sqlName,async(err,rows,fields)=>{
            if(err) throw err;
            const resultName = rows[0].Name
            
        function token(){
            min = Math.ceil(000000);
            max = Math.floor(999999);
            return Math.floor(Math.random() * (max - min) + min)
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'westley.schmidt84@ethereal.email',
                pass: 'vsgcz2CdVDjs2nX5NT'
            }
        });

        let info = await transporter.sendMail({
            from:"XD",
            to:email,
            subject:"Recuperar Contraseña de tu cuenta de MetAnimation",
            text:"Has solicitado para recuperar tu contraseña de tu cuenta de MetAnimation",
            html:`
            <div>
                <p>Hello ${resultName}</p>
            </div>`
        })
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.json(nodemailer.getTestMessageUrl(info))
        })
  } catch (err) {
        res.status(500).json({err})
    }
}

module.exports={
    PostEmailToken
}