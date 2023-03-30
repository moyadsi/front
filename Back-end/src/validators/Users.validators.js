const Joi = require('joi')

const SignUpValidate=async(req,res,next)=>{
  try {
    const SignUpSchema = Joi.object({
<<<<<<< HEAD:Back-end/src/validators/Users.validators.js
      Cedula:Joi.number().min(8).required(),
=======
      Cedula:Joi.string().min(10).max(10).required(),
>>>>>>> main:Back-end/src/validators/profile.validators.js
      Nombre:Joi.string().min(2).max(50).required(),
      Apellido:Joi.string().min(2).max(50).required(),
      Celular:Joi.number().min(8).required(),
      Email:Joi.string().lowercase().email().required(),
      Password:Joi.string().min(8).required(),
<<<<<<< HEAD:Back-end/src/validators/Users.validators.js
      rol:Joi.string().min(2),
      rolAd:Joi.string().min(9)
=======
      Rol:Joi.string().min(2),
      RolAd:Joi.string()
>>>>>>> main:Back-end/src/validators/profile.validators.js
    })
    await SignUpSchema.validateAsync(req.body)

    next()
  } catch (error) {
    return res.status(422).json({error})
  } 
  
}

const SigninValidate=async(req,res,next)=>{
  try {
    const SignInSchema = Joi.object({
      email:Joi.string().lowercase().email().required(),
      Password:Joi.string().min(8).required()
    })

    await SignInSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  }
}
const ModifyPasswordValidate=async(req,res,next)=>{
  try {
    ModifyPasswordSchema= Joi.object({
      Password:Joi.string().min(8).required(),
      NewPassword:Joi.string().min(8).required()
    })

    await ModifyPasswordSchema.validateAsync(req.body)
    next()
  } catch (error) {
    return res.status(422).json({error})
  }

}
const ModifyUserValidate=async(req,res,next)=>{
try {
  ModifyUserSchema =Joi.object({
    Name:Joi.string().min(2).max(50).required(),
    lastname:Joi.string().min(2).max(50).required(),
    phone:Joi.number().min(8).required(),
    email:Joi.string().lowercase().email().required(),
    Password:Joi.string().min(8).required(),
    Rol:Joi.string().min(2)
  })

  await ModifyUserSchema.validateAsync(req.body)
  next()
} catch(error) {
    return res.status(422).json({error})
}
}

module.exports = {
  SignUpValidate,
  SigninValidate,
  ModifyPasswordValidate,
  ModifyUserValidate
}