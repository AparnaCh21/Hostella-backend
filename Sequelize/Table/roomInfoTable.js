const Sequelize = require("sequelize");
const sequelize = require('../sequel.js');
const Hostel = require("./hostelTable.js");
const Room = require("./roomTable.js");
const User = require("./userTable.js");


const roomInfo = sequelize.define("roomInfo",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    joinDate:{
        type:Sequelize.STRING
    },
    ownerId:{
        type : Sequelize.STRING
    }
})

Room.hasMany(roomInfo);
roomInfo.belongsTo(Room);

User.hasMany(roomInfo,{ foreignKey : 'guestId'});
roomInfo.belongsTo(User,{foreignKey : 'guestId'});

Hostel.hasMany(roomInfo);
roomInfo.belongsTo(Hostel);







module.exports = roomInfo;

