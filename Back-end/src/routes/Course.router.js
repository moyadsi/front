const CourCrl = require('../controllers/Course.Controller')
const router = require('express').Router()

router.get('/',CourCrl.GetCourseAll)
router.get('/:id',CourCrl.GetCourseElement)
router.post('/add',CourCrl.AddCourse)

module.exports = router;