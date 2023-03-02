const router = require('express').Router()
const conexion = require('./config/conexion')
const bcrypt = require('bcrypt')

//Asignamos rutas

// Mostrar Todos
router.get('/',(req,res)=>{
    let sql = 'select * from tb_user'
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

// Leer Usuario
router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = 'select * from tb_user where id = ?'
    conexion.query(sql,[id],(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

// Agregar Usuario
router.post('/' , async(req,res)=>{
    const {firstname, lastname, phone, email, accesscode} = req.body
    const passwordcrack = await bcrypt.hash(accesscode,10)
    let sql = `insert into tb_user (firstname, lastname, phone, email, accesscode) values ('${firstname}','${lastname}', '${phone}', '${email}', '${accesscode}')`
    console.log(sql);
    conexion.query(sql, (err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Agregado'})
        }
    })
});

// Eliminar Usuario
router.delete('/:id',(req,res)=>{
    const {id} = req.params
    let sql = `delete from tb_user where id = '${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Eliminado'})
        }
    })
});


// Modificar Usuario
router.put('/:id',(req,res)=>{
    const {id} = req.params
    const{firstname, lastname, phone, email, accesscode}= req.body
    let sql =   `update tb_user set
                firstname ='${firstname}',
                lastname = '${lastname}',
                phone = '${phone}', 
                email = '${email}', 
                accesscode = '${accesscode}'
                where id = '${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Modificado'})
        }
    })
});


// Login
router.post('/login',(req,res)=>{
    const {email, accesscode} = req.body
    let sql = 'select firstname, id from tb_user where email =  ?'
    conexion.query(sql,[email],(err,rows,fields)=>{
        if(err) throw err;
        else{
            console.log(rows)
            if (rows.length == 1) {
               res.json(rows) 
            }else{
                res.json({response:"User does not exist"})
            }
            
        }
    })
});

module.exports = router;

//probando