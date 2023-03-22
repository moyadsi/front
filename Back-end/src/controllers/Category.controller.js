const conexion = require('../config/conexion')

const GetCategoryAll = (req,res)=>{
    try {
        let sql = 'select * from category'
        conexion.query(sql,(err,rows,fields)=>{
            if(err)throw err
            else{
                res.status(200).json(rows)
            }
        })

    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddCategory = (req,res) =>{
    try {
        const {Name,Description,Id_Course} = req.body
        let sql = `insert into Category (NameCategory,DescriptionCategory,Id_Course) values (?,?,?)`

        conexion.query(sql,[Name,Description,Id_Course],(err,rows,fields)=>{
            console.log(rows);
            if(err)throw err;
            else{
                res.status(200).json(rows)
            }
        })

    } catch (error) {
        return res.status(500).json({error})
    }
}


module.exports = {
    AddCategory,
    GetCategoryAll
}