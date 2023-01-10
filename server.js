const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const connection = require("./config/database.js");
const sequelize = require("./Sequelize/sequel.js")
const app=express();
var cron = require("node-cron");
var init = require("./cronJob.js");         /*-------------------CRON JOB-------------------*/
require("dotenv").config();



app.use(bodyParser.json());
app.use(cookieParser());
app.use('',require("./Router/ownerRouter.js"));    /*---Owner Router---*/
app.use('',require("./Router/guestRouter.js"));    /*---Guest Router---*/
app.use('',require("./Router/router.js"));         /*---Common Router---*/




app.get('/',()=>{res.send("bro");})

// sequelize.sync();
// sequelize.sync({force : true});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(process.env.PORT,()=>{
    console.log("Hi,go on",process.env.PORT,"...");
    connection.connect((err)=>{
        console.log("Database Connected!!!");
        // init.manualBill("Feb");
        
        // cron.schedule('*/10 03 12 7 Feb Fri',()=>{
        //   init.data();
        // })

    })  
});
