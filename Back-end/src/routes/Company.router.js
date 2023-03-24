const router = require('express').Router()
const ComPCtrl=require ('../controllers/Company.controller')
const { verifyTokenEmailCompany, verifyTokenPasswordCompany } = require('../middlewares/Company.auth')
const { verifyTokenAdministrador } = require('../middlewares/Users.auth')
const { CompanySignUpValidate, CompanySigninValidate, CompanyModifyPasswordValidate, CompanyModifyCompanyValidate } = require('../validators/company.validators')

router.get('/',ComPCtrl.GetAll) 
router.get('/:id',ComPCtrl.Get)
router.delete('/:id',verifyTokenAdministrador,verifyTokenEmailCompany,ComPCtrl.DeleteCompany)
router.put('/UpdateCompany/Admin/:id',CompanyModifyCompanyValidate,verifyTokenAdministrador,ComPCtrl.ModifyCompany)
router.put('/UpdateCompany/:id',CompanyModifyCompanyValidate,verifyTokenEmailCompany,ComPCtrl.ModifyCompany)
router.put('/UpdatePassword/:id',CompanyModifyPasswordValidate,verifyTokenPasswordCompany,ComPCtrl.ModifyPassword)
router.post('/SignUp',CompanySignUpValidate,ComPCtrl.SignUp)
router.post('/SignIn',CompanySigninValidate,ComPCtrl.SignIn)

module.exports = router;