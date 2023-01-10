const Hostel = require("../Sequelize/Table/hostelTable");
const Block = require("../Sequelize/Table/blockTable");
const Floor = require("../Sequelize/Table/floorTable");
const Room = require("../Sequelize/Table/roomTable");
const roomInfo = require("../Sequelize/Table/roomInfoTable");

module.exports = { validComplaint };

async function validComplaint(data, loggedInUser) {
  let roominfo = await roomInfo
    .findAll({ where: { userId: loggedInUser.id } })
    .then((result) => {
      return JSON.parse(JSON.stringify(result[0]));
    });

  let room = await Room.findAll({ where: { id: data.roomId } }).then(
    (result) => {
      if (result[0]) {
        return JSON.parse(JSON.stringify(result[0]));
      } else {
        return null;
      }
    }
  );

  /*************************************Validation***************************************/
  if (room) {
    if (roominfo.roomId == data.roomId) {
      /*-----Checking whether loggedInUser is raising complaint for his Room------*/
      return ({data :true});
    } else {
      return {
        data: null,
        message: "You are not permitted to raise complaint for this room...",
      };
    }
  } else {
    return { data: null, message: "No room found..." };
  }
}
