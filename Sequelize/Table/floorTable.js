const Sequelize  = require('sequelize');
const sequelize = require('../sequel');
const Block = require("../Table/blockTable.js");

const Floor = sequelize.define("floor",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    floorNumber:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

Block.hasMany(Floor);
Floor.belongsTo(Block);

module.exports = Floor;
