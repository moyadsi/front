const Joi = require('joi')

const CompanySignUpValidate=async(req,res,next)=>{
  try {
    const SignUpSchema = Joi.object({
      NameCompany:Joi.string().min(2).max(50).required(),
      PhoneCompany:Joi.number().min(8).required(),
      EmailCompany:Joi.string().lowercase().email().required(),
      Addres:Joi.string().min(2).max(50).required(),
      PasswordCompany:Joi.string().min(8).required(),
      RankMem:Joi.string().min(2).max(50).required()
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

const CompanySigninValidate=async(req,res,next)=>{
  try {
    const SignInSchema = Joi.object({
      EmailCompany:Joi.string().lowercase().email().required(),
      PasswordCompany:Joi.string().min(8).required()
    })

    await SignInSchema.validateAsync(req.body)
    next()
  } catch (error) {
    if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
  }
}
const CompanyModifyPasswordValidate=async(req,res,next)=>{
  try {
    ModifyPasswordSchema= Joi.object({
      PasswordCompany:Joi.string().min(8).required(),
      NewPassword:Joi.string().min(8).required()
    })

    await ModifyPasswordSchema.validateAsync(req.body)
    next()
  } catch (error) {
    if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
  }

}
const CompanyModifyCompanyValidate=async(req,res,next)=>{
try {
  const ModifyCompanySchema = Joi.object({
    NameCompany:Joi.string().min(2).max(50).required(),
    PhoneCompany:Joi.number().min(8).required(),
    EmailCompany:Joi.string().lowercase().email().required(),
    Addres:Joi.string().min(2).max(50).required(),
    PasswordCompany:Joi.string().min(8).required(),
    RankMem:Joi.string().min(2).max(50).required()
  })

  await ModifyCompanySchema.validateAsync(req.body)
  next()
} catch(error) {
  if(error.isJoi===true) Value = error.status=422;
    
    return res.status(Value).json({error})
}
}

module.exports = {
  CompanySignUpValidate,
  CompanySigninValidate,
  CompanyModifyPasswordValidate,
  CompanyModifyCompanyValidate
}