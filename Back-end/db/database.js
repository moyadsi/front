const mysql = require('mysql2/promise');
require('dotenv').config();

const queryDB = async (query) => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    })
    const [row, fields] = await db.execute(query)
    console.log(row);
    return new Promise((res, rej)=>{
        res([row, fields]);
        rej([row, fields]);
    })
}

module.exports = queryDB;