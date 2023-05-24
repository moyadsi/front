const axios = require('axios')
const conexion = require('../config/mysql.config')
require('dotenv').config()

const GetNoticie =(req,res)=>{
    try {
        let SearchSql=`select * from Noticies`
        conexion.query(SearchSql,(err,rows,fields)=>{
            if(err) throw err;
            else{
                res.status(200).json(rows)
            }
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}

const AddNoticie =(req,res)=>{
    try {
        const {Title,Description,Category,Author,PublicationDate,videoURL,podcastURl}= req.body;
        let AddNoticie = `insert into Noticies (Title,Description,Category,Author,PublicationDate,videoURL,podcastURl) values (?,?,?,?,?,?,?)`;
        conexion.query(AddNoticie,[Title,Description,Category,Author,PublicationDate,videoURL,podcastURl],(err,rows,fields)=>{
            if(err)throw err;
            else{
                res.status(200).json(rows[0])
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const DeleteNoticie  = (req,res)=>{
    try {
        const {id} = req.params
        let DeleteNoticie= `Delete from Noticies where id=${id}`
        let SearchNoticieId= `Select * from Noticies where id=${id}`;
        conexion.query(SearchNoticieId,(err,rows,fields)=>{
            if(err)throw err;
            else if(rows[0]==undefined){
                res.status(404).json({message:"Noticie not found"})
            }
            else if(rows){  
                conexion.query(DeleteNoticie,(err,rows,fields)=>{
                if(err)throw err
                else{
                    res.status(200).json({message:"Delete Noticie Success"})
                }
            })
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
const UpdateNoticie=(req,res)=>{
    try {
        const {id} = req.params
        const {Title,Description,Category,Author,videoURL,podcastURl}= req.body;
        let SearchNoticieId= `Select * from Noticies where Id=${id}`;
        let UpdateNoticie=  `Update Noticies set Title='${Title}',Description='${Description}',Category='${Category}',Author='${Author}',VideoURL='${videoURL}',podcastURl='${podcastURl}' where Id=${id}`;
        conexion.query(SearchNoticieId,(err,rows,fields)=>{
            if(err)throw err;
            else if(rows[0]==undefined){
                res.status(404).json({message:"Noticie not found"})
            }
            else if(rows){
                conexion.query(UpdateNoticie,(err,rows,fields)=>{
                    if(err)throw err;
                    else{
                        res.status(200).json({message:"Noticie updated"})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    GetNoticie,
    AddNoticie,
    DeleteNoticie,
    UpdateNoticie
}