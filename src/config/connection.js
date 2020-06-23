const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_tasks",
    port: 3000,
})

module.exports = { connection };