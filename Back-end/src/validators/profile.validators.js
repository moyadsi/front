const Joi = require('joi')

const SignUpSchema =Joi.object({
  Name:Joi.string().min(2).max(50).required(),
  lastname:Joi.string().min(2).max(50).required(),
  phone:Joi.number().min(8).required(),
  email:Joi.string().lowercase().email().required(),
  Password:Joi.string().min(8).required()
})

const SigninSchema = Joi.object({
  email:Joi.string().lowercase().email().required(),
  Password:Joi.string().min(8).required()
})

const ModifyPasswordSchema= Joi.object({
  Password:Joi.string().min(8).required(),
  NewPassword:Joi.string().min(8).required()
})
const ModifyUserSchema =Joi.object({
  Name:Joi.string().min(2).max(50).required(),
  lastname:Joi.string().min(2).max(50).required(),
  phone:Joi.number().min(8).required(),
  email:Joi.string().lowercase().email().required(),
  Password:Joi.string().min(8).required()
})

module.exports = {
  SignUpSchema,
  SigninSchema,
  ModifyPasswordSchema,
  ModifyUserSchema
}