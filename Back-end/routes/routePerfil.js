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
    let sql = `insert into Person (Name, lastname, phone, email, Password) values ('${Name}','${lastname}', '${phone}', '${email}', '${BcryptPassword}')`
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
                LastName = '${lastname}',
                Phone = '${phone}', 
                Email = '${email}', 
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
    let sqlP = 'select Password from Person where email =  ?'
    
    const UserFound = conexion.query(sql,[req.body.email],(err, rows,fields) => {
        if(rows.length == 1){
            console.log("authorized");
            conexion.query(sqlP,[req.body.email],(err,rows)=>{
                const Password = rows[0].Password
        
                bcrypt.compare(req.body.Password,Password,(err,hash)=>{
                    if(err) throw err;  
                    console.log(hash);
                    if(hash){
                        console.log("Sign in successful");
                        res.status(201).json({message:"Sign in successful"})
                    }else{
                        console.log("Password Incorrect");
                        res.status(401).json({message:"Password Incorrect"})
                    }
                })
            })
        }else{
            
            res.status(401).json({response:"User does not exist"})

        }
    })
});

module.exports = router;