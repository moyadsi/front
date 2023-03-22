const NotiCtrl = require('../controllers/Noticies.controller')

const router = require('express').Router()

router.get('/',NotiCtrl.GetNoticie)


module.exports = router;