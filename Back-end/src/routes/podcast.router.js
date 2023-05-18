const router = require('express').Router()
const CrtlPodcast = require('../controllers/podscast.controller')

router.get('/',CrtlPodcast.GetPodCast)
router.get('/:Name',CrtlPodcast.GetPodCastName)
router.post('/New',CrtlPodcast.AddPodCast)

module.exports = router;