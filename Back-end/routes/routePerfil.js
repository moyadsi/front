const router = require('express').Router()
const conexion = require('../config/conexion')
const bcrypt = require('bcrypt')

//Asignamos rutas

// Mostrar Todos
router.get('/',(req,res)=>{
    let sql = 'select * from Person'
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
router.post('/Register' , async(req,res)=>{
    const {Name, lastname, phone, email, Password} = req.body
    const BcryptPassword = await bcrypt.hash(Password,10)
    let sql = `insert into Person (Name, lastname, phone, email, Password) values ('${Name}','${lastname}', '${phone}', '${email}', '${Password}')`
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
    let sql = `delete from Person where id = '${id}'`
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
    const{Name, lastname, phone, email, Password}= req.body
    let sql =   `update Person set
                Name ='${Name}',
                lastname = '${lastname}',
                phone = '${phone}', 
                email = '${email}', 
                Password = '${Password}'
                where id = '${id}'`
    conexion.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'Usuario Modificado'})
        }
    })
});


// Login
router.post('/login', (req,res)=>{
    let sql = 'select Name, id from Person where email =  ?'
    conexion.query(sql,[req.body.email],async(err,rows,fields)=>{
        console.log(rows)
        if(err) throw err;
        else{
            if(rows.length == 1){
                let sqlPassword = 'select Name,id from Person where Password = ?'
                
                const PasswordFound = conexion.query(sqlPassword,[req.body.Password],(err)=>{
                    
                    if(err)return res.status(401).json({message:"password Incorrect"});

                console.log(PasswordFound.sql);
                console.log(PasswordFound.values);

                    bcrypt.compare(req.body.Password, PasswordFound.values.toString(),(err,fields)=>{

                    if(err)return res.status(401).json({message:"password Incorrect"});
                    
                })
                })
            }else{
                
                res.json({response:"User does not exist"})

            }
        }
    })
});

module.exports = router;