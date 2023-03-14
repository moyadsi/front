const Joi = require('joi')

const SignUpValidate=async(req,res,next)=>{
  try {
    const SignUpSchema = Joi.object({
      Cedula:Joi.number().min(8).required(),
      Name:Joi.string().min(2).max(50).required(),
      lastname:Joi.string().min(2).max(50).required(),
      phone:Joi.number().min(8).required(),
      email:Joi.string().lowercase().email().required(),
      Password:Joi.string().min(8).required(),
      Rol:Joi.string().min(2)
    })

    console.log(req.body);
    console.log(SignUpSchema.validate);
    await SignUpSchema.validateAsync(req.body)

    next()
  } catch (error) {
    if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
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
    if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
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
    if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
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
  if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
}
}

module.exports = {
  SignUpValidate,
  SigninValidate,
  ModifyPasswordValidate,
  ModifyUserValidate
}