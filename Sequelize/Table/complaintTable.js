const Sequelize = require("sequelize");
const sequelize = require('../sequel.js');
const Hostel = require("./hostelTable.js");
const Room = require("./roomTable.js");
const User = require("./userTable.js");


const Complaint = sequelize.define("complaint",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    complaint:{
        type : Sequelize.STRING
    },
    valid:{
        type : Sequelize.BOOLEAN
    },
    action:{
        type: Sequelize.STRING
    },
    ownerId:{
        type : Sequelize.INTEGER
    }
})

Room.hasMany(Complaint);
Complaint.belongsTo(Room);

User.hasMany(Complaint);
Complaint.belongsTo(User);

Hostel.hasMany(Complaint);
Complaint.belongsTo(Hostel);


module.exports = Complaint;

