const router = require('express').Router()
const ProCtrl=require ('../controllers/Profile.controller')
const { verifyTokenEmail, verifyTokenPassword, verifyTokenAdministrador } = require('../middlewares/Profile.auth')
const { SignUpValidate, SigninValidate, ModifyUserValidate, ModifyPasswordValidate } = require('../validators/profile.validators')

router.get('/',ProCtrl.GetAll)
router.get('/:id',ProCtrl.Get)
router.delete('/:id',ProCtrl.DeleteUser)
router.put('/UpdateUser/:id',ModifyUserValidate,verifyTokenEmail,ProCtrl.ModifyUser)
router.put('/UpdateUser/Admin/:id',ModifyUserValidate,verifyTokenAdministrador,ProCtrl.ModifyUser)
router.put('/UpdatePassword/:id',ModifyPasswordValidate,verifyTokenPassword,ProCtrl.ModifyPassword)
router.post('/SignUp',SignUpValidate,ProCtrl.SignUp)
router.post('/SignIn',SigninValidate,ProCtrl.SignIn)

module.exports = router;