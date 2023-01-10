const Sequelize = require("sequelize");
const sequelize = require("../sequel.js");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  countryCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  roleId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  isActive: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pwd: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = User;
