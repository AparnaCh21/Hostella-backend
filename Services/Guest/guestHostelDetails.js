const json = require("jsonwebtoken");
const BLOCK = require("../../Sequelize/Table/blockTable.js");
const FLOOR = require("../../Sequelize/Table/floorTable.js");
const HOSTEL = require("../../Sequelize/Table/hostelTable.js");
const ROOMINFO = require("../../Sequelize/Table/roomInfoTable.js");
const ROOM = require("../../Sequelize/Table/roomTable");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");

  
async function hostelDetails(req, res, cb) {
  var user = json.verify(req.cookies.Token, process.env.KEY);
  const guestHostelDetails = await ROOMINFO.findAll({
    attributes: {
      exclude: ["joinDate", "createdAt", "updatedAt", "roomId", "userId"],
    },
    include: [
      {
        model: ROOM,
        attributes: ["id","roomNumber"],
        include: [
          {
            model: FLOOR,
            attributes: ["id","floorNumber"],
            include: [
              {
                model: BLOCK,
                attributes: ["id","blockName"],
                include: [
                  { 
                    model: HOSTEL, 
                    attributes: ["id","hostelName","userId"] 
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
    where: { userId: user.id },
  }).then((result) => {
    if(result[0]){
      return JSON.parse(JSON.stringify(result[0]));
    } else {
      res.send(commonService.FAILURE_MSG(CONSTANT_MSG.failure,CONSTANT_MSG.failure_code,CONSTANT_MSG.not_Added))
      return null;
    }
  });
  if(guestHostelDetails){
  roomDetails = { roomId : guestHostelDetails.room['id'], roomNumber:guestHostelDetails.room['roomNumber']}
  floorDetails = { floorId : guestHostelDetails.room.floor['id'], floorNumber:guestHostelDetails.room.floor['floorNumber']}
  blockDetails = { blockId : guestHostelDetails.room.floor.block['id'], blockName : guestHostelDetails.room.floor.block['blockName']};
  hosteldetails = { userId : guestHostelDetails.room.floor.block.hostel['userId'],hostelId : guestHostelDetails.room.floor.block.hostel['id'], hostelName : guestHostelDetails.room.floor.block.hostel['hostelName']};
  return cb(
    commonService.SUCCESS_MSG(
      CONSTANT_MSG.success,
      CONSTANT_MSG.success_code,
      CONSTANT_MSG.data_ok,
      ({hosteldetails,blockDetails,floorDetails,roomDetails})
    )
  ); 
  } else {
    return ;
  }
}

module.exports = { hostelDetails };