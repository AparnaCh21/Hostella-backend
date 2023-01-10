const HOSTEL = require("../../Sequelize/Table/hostelTable.js");
const BLOCK = require("../../Sequelize/Table/blockTable.js");
const FLOOR = require("../../Sequelize/Table/floorTable.js");
const ROOM = require("../../Sequelize/Table/roomTable.js");
const USER = require("../../Sequelize/Table/userTable");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
module.exports = { createHostel };


async function createHostel(hostelDetails, cookies,res,cb) {
  var email = cookies.loggedInUser;
  console.log(email);
  var userid = await USER.findOne({ where: { email: `${email}` } }).then(
    (result) => {
      if(!result){
        return result;
      }
      return result.dataValues.id;
    }
  );
  if(!userid){
    return {
      "status": " Failure ",
      "code": " 400 ",
      "message": "User Not Found for email : " + email,
      "data": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiQXBhcm5hIiwibGFzdE5hbWUiOiJDaG91ZGFyYW0iLCJlbWFpbCI6ImFwcmFuYWNob3VkYXJhbTk3QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiODEyNTI2ODI4MyIsImNvdW50cnlDb2RlIjoiKzkxIiwicm9sZUlkIjoiMSIsImlzQWN0aXZlIjoidHJ1ZSIsImNyZWF0ZWRBdCI6IjIwMjItMTItMjJUMTM6NTY6MjAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjJUMTM6NTY6MjAuMDAwWiJ9.cbKzxIJSPy4mrWOmxF0FCqVVhgFF9uf7IaWf6qxw7gI"
  }
  }
  
  HOSTEL.create({
    hostelName: hostelDetails.hostel["hostelName"],
    hostelAddress: hostelDetails.hostel["hostelAddress"],
    hostelArea: hostelDetails.hostel["hostelArea"],
    userId: userid,
  })
    .then((result) => {
      console.log("Hostel Added successfully!...  ");
      ADD_BLOCK(hostelDetails.hostel.block, result.dataValues.id);
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.hostel_Added,
          JSON.parse(JSON.stringify(result))
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function ADD_BLOCK(blockDetails, hostelid) {
  blockDetails.forEach((perblock) => {
    BLOCK.create({
      blockName: perblock.blockName,
      hostelId : hostelid,
    })
      .then((result) => {
        console.log(`${perblock.blockName}`, "added successfully!...");
        ADD_FLOOR(perblock.floors, result.dataValues.id);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function ADD_FLOOR(floorDetails, hostelid) {
  floorDetails.forEach((perfloor) => {
    FLOOR.create({
      floorNumber: perfloor.floorNo,
      blockId: hostelid,
    })
      .then((result) => {
        console.log(`${perfloor.floorNo}`, "added successfully!...");
        ADD_ROOM(perfloor.rooms, result.dataValues.id);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function ADD_ROOM(roomDetails, floorid) {
  roomDetails.forEach((perroom) => {
    ROOM.create({
      roomNumber: perroom.roomNo,
      floorId: floorid,
    })
      .then((result) => {
        console.log("Room added successfully!...");
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
           