const Sequelize = require("sequelize");
const sequelize = require('../sequel.js');


const Announcement = sequelize.define("announcement",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    ownerId:{
        type : Sequelize.STRING
    },
    hostelId:{
        type : Sequelize.STRING
    },
    message :{
        type : Sequelize.STRING
    }
})

module.exports = Announcement;