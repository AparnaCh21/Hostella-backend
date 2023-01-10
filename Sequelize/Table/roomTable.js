const Sequelize = require('sequelize');
const sequelize = require('../sequel');
const Floor = require("../Table/floorTable.js");

const Room = sequelize.define("room",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    roomNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    share:{
        type:Sequelize.INTEGER,
        defaultValue:4
    },
    charegePerPerson:{
        type:Sequelize.INTEGER,
        defaultValue:5000
    },
    additionalCharge:{
        type:Sequelize.INTEGER,
        allownull:true,
        defaultValue:0
    },
    roomType:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:"AC"
    },
    roomStatus:{
        type:Sequelize.STRING,
        defaultValue:"FREE"
    },
    currentUsers:{
        type:Sequelize.INTEGER,
        alowNull:true,
        defaultValue:0
    }
})

Floor.hasMany(Room);
Room.belongsTo(Floor);

module.exports = Room;