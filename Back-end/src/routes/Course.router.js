const CourCrl = require('../controllers/Course.Controller')
const router = require('express').Router()
const ValidatorCourse = require('../validators/Course.validators')

router.get('/',CourCrl.GetCourseAll)
router.get('/:id',CourCrl.GetCourseElement)
router.post('/add',ValidatorCourse.AddCourse,CourCrl.AddCourse)
router.put('/update/:id',CourCrl.UpdateCourse)


module.exports = router;