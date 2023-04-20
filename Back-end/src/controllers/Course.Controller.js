const conexion = require('../config/conexion')


const GetCourseAll = (req,res) =>{
    try {
        let sql = `call GetAllCourse();`
        conexion.query(sql, (err, rows, fields) => {
            if (err)
              throw err;
            else {
              res.json(rows[0]);
            }
          });
    } catch (error) {
        return res.status(500).json({error});
    }
}

const GetCourseElement = (req,res)=>{
    try {
        const {id} = req.params.id
        let sql = `call GetCourseElement(?);`
        conexion.query(sql,[id], (err, rows, fields) => {
            if (err)
              throw err;
            else {
              res.status(200).json(rows);
            }
          });
    } catch (error) {
        return res.status(500).json({error});
    }
}

const AddCourse=(req,res)=>{
    try {
        const {IdCourse,DescriptionCurso,Duration,IdTeacher,IdCategory,Lenguaje,Url} =req.body
        let sql = `call CreateCourse('${IdCourse}','${DescriptionCurso}','${Duration}','${IdTeacher}','${IdCategory}','${Lenguaje}','${Url}')`
        conexion.query(sql,(err,rows,fields)=>{
          if(err) throw err
          else{
            return res.status(200).json({message:"Curso creado perfectamente"})
          }
        })
    } catch (error) {
        return res.status(500).json({error});
    }
}

const UpdateCourse=(req,res)=>{
  try {
    const {DescriptionCurso,Duration,IdTeacher,IdCategory,Lenguaje,Url} =req.body;
    let SearchCourseId=`select id_Course from course inner join AllCourse where AllCourse.Id=${req.params.id} `
    conexion.query(SearchCourseId,(err,rows,fields)=>{
      if(err)throw err;
      else{
        let UpdateCourseSql=``
      }
    })
  } catch (error) {
    
  }
}

module.exports ={
    GetCourseAll,
    GetCourseElement,
    AddCourse
}