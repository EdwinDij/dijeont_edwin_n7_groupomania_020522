const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '191623Er!',
    database: 'groupomania',
})

module.exports = db;