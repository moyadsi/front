"use strict";

var Joi = require('joi');
var SignUpSchema = Joi.object({
  Name: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  phone: Joi.number().min(8).required(),
  email: Joi.string().lowercase().email().required(),
  Password: Joi.string().min(8).required()
});
var SigninSchema = Joi.object({
  email: Joi.string().lowercase().email().required(),
  Password: Joi.string().min(8).required()
});
var ModifyPasswordSchema = Joi.object({
  Password: Joi.string().min(8).required(),
  NewPassword: Joi.string().min(8).required()
});
var ModifyUserSchema = Joi.object({
  Name: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  phone: Joi.number().min(8).required(),
  email: Joi.string().lowercase().email().required(),
  Password: Joi.string().min(8).required()
});
module.exports = {
  SignUpSchema: SignUpSchema,
  SigninSchema: SigninSchema,
  ModifyPasswordSchema: ModifyPasswordSchema,
  ModifyUserSchema: ModifyUserSchema
};