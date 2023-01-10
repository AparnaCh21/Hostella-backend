const Sequelize = require("sequelize");
const sequelize = require('../sequel.js');
const roomInfo = require("./roomInfoTable.js");


const Bill = sequelize.define("bill",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    }, 
    year : {
        type : Sequelize.STRING
    },
    month : {
        type : Sequelize.STRING
    },
    amount:{
        type : Sequelize.INTEGER
    },
    status : {
        type : Sequelize.STRING
    },
    paidDate : {
        type : Sequelize.STRING
    },
    guestId : {
        type : Sequelize.STRING
    },
    hostelId : {
        type : Sequelize.STRING
    },
    ownerId :{
        type : Sequelize.STRING
    }


})

roomInfo.hasMany(Bill);
Bill.belongsTo(roomInfo);

module.exports = Bill;