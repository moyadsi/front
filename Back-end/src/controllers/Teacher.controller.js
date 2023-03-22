const conexion = require('../config/conexion')

const GetAllTeacher = (req,res)=>{
    try {
        let sql = `select Teacher.*,Person.Name,Person.Email,Person.Phone from Teacher inner join Person`
        conexion.query(sql,(err,rows,fields)=>{
            if(err) throw err
            else {
                res.status(200).json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}   

const GetIdTeacher = (req,res)=>{
    try {
        const id = req.params.id
        let sql = `call GetTeacherId(?)`
        conexion.query(sql,[id],(err,rows,fields)=>{
            if(err) throw err
            else {
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddTeacher = (req,res)=>{
    try {
        const {Experiencia,Estudio,PersonId} = req.body
        let sql = `call AddTeacher(?,?,?)`
        conexion.query(sql,[PersonId,Experiencia,Estudio],(err,rows,fields)=>{
            if(err)throw err
            else{
                console.log(rows.affectedRows);
                res.status(200).json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports={
    GetAllTeacher,
    AddTeacher,
    GetIdTeacher
}