const sql = require('mysql');
require("dotenv").config();

const connection = sql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:'root'
})


module.exports=connection;