const Sequelize = require('sequelize');

const sequelize= new Sequelize(`sample_one`,`root`,`root`,{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;