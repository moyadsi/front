const router = require('express').Router()
const ComPCtrl=require ('../controllers/Company.controller')
const { verifyTokenEmail, verifyTokenPassword } = require('../middlewares/jwt.auth')
const { SignUpValidate, SigninValidate, ModifyUserValidate, ModifyPasswordValidate } = require('../validators/profile.validators')

router.get('/',ComPCtrl.GetAll) 
router.get('/:id',ComPCtrl.Get)
/*router.delete('/:id',ComPCtrl.DeleteUser)
router.put('/UpdateUser/:id',ModifyUserValidate,verifyTokenEmail,ComPCtrl.ModifyUser)
router.put('/UpdatePassword/:id',ModifyPasswordValidate,verifyTokenPassword,ComPCtrl.ModifyPassword)*/
router.post('/SignUp',ComPCtrl.SignUp)
/*router.post('/SignIn',SigninValidate,ComPCtrl.SignIn) */

module.exports = router;