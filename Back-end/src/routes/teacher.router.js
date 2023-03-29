const Router = require('express').Router();
const TeacCtrl = require('../controllers/Teacher.controller')
const {verifyTokenAdministrador,verifyTokenEmail}=require('../middlewares/Teacher.auth')

Router.get('/',TeacCtrl.GetAllTeacher)
Router.get('/:id',TeacCtrl.GetIdTeacher)
Router.post('/Add',TeacCtrl.AddTeacher)
Router.put('/Update/:id',TeacCtrl.UpdateTeacher)
Router.delete('/Delete/:id',TeacCtrl.DeleteTeacher)

module.exports = Router