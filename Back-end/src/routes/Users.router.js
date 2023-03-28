const router = require('express').Router()
const ProCtrl=require ('../controllers/Users.controller')
const { verifyTokenEmail, verifyTokenPassword, verifyTokenAdministrador } = require('../middlewares/Users.auth')
const { SignUpValidate, SigninValidate, ModifyUserValidate, ModifyPasswordValidate } = require('../validators/Users.validators')
/* const UserCtrl = require('../controllers/User.controller')}
const HelUser = require('../helpers/User/users.password') */

router.get('/',ProCtrl.GetAll)
router.get('/:id',ProCtrl.Get)
router.delete('/:id',verifyTokenAdministrador,verifyTokenEmail,ProCtrl.DeleteUser)
router.put('/UpdateUser/:id',ModifyUserValidate,verifyTokenEmail,ProCtrl.ModifyUser)
router.put('/UpdateUser/Admin/:id',ModifyUserValidate,verifyTokenAdministrador,ProCtrl.ModifyUser)
router.put('/UpdatePassword/:id',ModifyPasswordValidate,verifyTokenPassword,ProCtrl.ModifyPassword)
router.post('/SignUp',SignUpValidate,ProCtrl.SignUp)
router.post('/SignIn',SigninValidate,ProCtrl.SignIn)
/* 
//Example
router.post('/Email/SolicitarCodigo',UserCtrl.SendEmailToken)
router.put('/Email/Olvido',UserCtrl.EmailPassword) */

module.exports = router;