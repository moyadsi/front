const router = require('express').Router()
const CrtlPodcast = require('../controllers/podscast.controller')

router.get('/',CrtlPodcast.GetPodCast)

module.exports = router;