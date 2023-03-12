const router = require('express').Router()
const ProCtrl=require ('../controllers/Profile.controller')

router.get('/',ProCtrl.GetAll)
router.get('/:id',ProCtrl.Get)
router.delete('/:id',ProCtrl.DeleteUser)
router.put('/UpdateUser/:id',ProCtrl.ModifyUser)
router.put('/UpdatePassword/:id',ProCtrl.ModifyPassword)
router.post('/SignUp',ProCtrl.SignUp)
router.post('/SignIn',ProCtrl.SignIn)

module.exports = router;