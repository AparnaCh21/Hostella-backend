const Sequelize = require('sequelize');
const sequelize = require('../sequel');
const Hostel = require('../Table/hostelTable.js');

const Block = sequelize.define("block",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    blockName:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

Hostel.hasMany(Block);
Block.belongsTo(Hostel);

module.exports = Block;