const Sequelize = require('sequelize');
const sequelize = require('../sequel');
const User = require("./userTable.js");

const Hostel = sequelize.define("hostel",{
    id:{
        type:Sequelize.INTEGER,                     
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    hostelName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    hostelAddress:{
        type:Sequelize.STRING,
        allowNull:true
    },
    hostelArea:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

User.hasMany(Hostel),{ foreignKey : 'ownerId'};
Hostel.belongsTo(User);

module.exports = Hostel;