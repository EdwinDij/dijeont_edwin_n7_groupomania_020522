const express = require ('express')
const app = express()

const mysql = require ('mysql');
const db = mysql.createConnection( {
    host : 'localhost',
    user : 'root',
    password : '191623Er!',
    database : groupomania,
})

app.listen(8000, (req, res) => {
    console.log ('server on')
});