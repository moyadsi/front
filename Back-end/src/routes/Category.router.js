const router = require('express').Router();
const CateCtrl = require('../controllers/Category.controller')

router.post('/Add',CateCtrl.AddCategory)
router.get('/',CateCtrl.GetCategoryAll)

module.exports = router