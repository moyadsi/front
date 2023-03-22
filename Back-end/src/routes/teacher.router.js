const Router = require('express').Router();
const TeacCtrl = require('../controllers/Teacher.controller')

Router.get('/',TeacCtrl.GetAllTeacher)
Router.get('/:id',TeacCtrl.GetIdTeacher)
Router.post('/Add',TeacCtrl.AddTeacher)

module.exports = Router