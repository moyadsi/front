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
        const {idCurso,NameCategoria,DescriptionCurso,Duration,ExperenciaProfesor,Estudios} =req.body
        let sql = ``
    } catch (error) {
        
    }
}

module.exports ={
    GetCourseAll,
    GetCourseElement,
    AddCourse
}