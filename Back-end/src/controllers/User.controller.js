const DB = require('../config/db.config')
const nodemailer = require('nodemailer')
require('dotenv').config()


const GetEmailToken = async(req,res)=>{
    try{

        const {email} = req.body;
        
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
            subject:"Recuperar Contraseña",
            text:"Hello",
            html:`
            <div>
                <p>Hello Word</p>
            </div>`
        })
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.json(nodemailer.getTestMessageUrl(info))
  } catch (err) {
    
    }
}

module.exports={
    GetEmailToken,
    EmailPassword
}