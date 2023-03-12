"use strict";

var router = require('express').Router();
var ProCtrl = require('../controllers/Profile.controller');
var _require = require('../validators/profile.validators'),
  SignUpSchema = _require.SignUpSchema,
  SigninSchema = _require.SigninSchema;
router.get('/', ProCtrl.GetAll);
router.get('/:id', ProCtrl.Get);
router["delete"]('/:id', ProCtrl.DeleteUser);
router.put('/UpdateUser/:id', ProCtrl.ModifyUser);
router.put('/UpdatePassword/:id', ProCtrl.ModifyPassword);
router.post('/SignUp', ProCtrl.SignUp);
router.post('/SignIn', ProCtrl.SignIn);
module.exports = router;