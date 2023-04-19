const Joi = require('joi');

const AddCourse=async(req,res,next)=>{
  try {
    const AddCourseSchema = Joi.object({
      IdCourse:Joi.number(),
      DescriptionCurso:Joi.string().max(255).required(),
      Duration:Joi.number().min(1).max(4).required(),
      IdTeacher:Joi.number().min(9).required(),
      IdCategory:Joi.number().min(1).required(),
      Lenguaje:Joi.string().min(1).required(),
      Url:Joi.string()
    })
    await AddCourseSchema.validateAsync(req.body)

    next()
  } catch (error) {
    return res.status(422).json({error})
  } 
  
}

module.exports ={
  AddCourse
}