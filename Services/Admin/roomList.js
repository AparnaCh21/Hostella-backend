const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const HOSTEL = require("../../Sequelize/Table/hostelTable.js");
const BLOCK = require("../../Sequelize/Table/blockTable.js");
const FLOOR = require("../../Sequelize/Table/floorTable.js");
const ROOM = require("../../Sequelize/Table/roomTable.js");
const ROOMINFO = require("../../Sequelize/Table/roomInfoTable");
const USER = require("../../Sequelize/Table/userTable.js");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");

async function blockDetails(details, res, cb) {
  /*---------USER DETAILS --------------*/
  switch (details.type) {
    case "USER":
      if(!details.key){
      HOSTEL.findAll({
        attributes :["id","hostelName","hostelArea"],
        where : { userId : details.id },
      }).then((result)=> {
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      });
    } else {
      HOSTEL.findAll({
        where : { userId : details.id,
          [Op.or]: [
            { hostelName: { [Op.like]: `%${details.key}%` } },
            { hostelArea: { [Op.like]: `%${details.key}%` } },
          ]
        }
      }).then((result)=>{
        return cb({
          data : JSON.parse(JSON.stringify(result))
        })
      })
    }
      break;

    /*---------HOSTEL DETAILS --------------*/
    case "HOSTEL":
      if(!details.key){
        const attributeNames = {
          Block : {
            id:"id"
          }
        }

      await BLOCK.findAll({
        attributes: ["id", "blockName"],
        where: { hostelId: details.id },
      }).then((result) => {
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      });
    } else {
      BLOCK.findAll({
        where : { hostelId : details.id,
           blockName : { [Op.like]: `%${details.key}%`}
        }
      }).then((result)=>{
        return cb({
          data : JSON.parse(JSON.stringify(result))
        })
      })
    }
      break;

    /*----------BLOCK DETAILS-------------*/
    case "BLOCK":
      if(!details.key){
      FLOOR.findAll({
        attributes: ["id", "floorNumber"],
        where: { blockId: details.id },
      }).then((result) => {
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      });
    } else {
      FLOOR.findAll({
        where  :{ blockId : details.id,
        floorNumber : { [Op.like]: `%${details.key}%`}
        }
      }).then((result)=>{
        return cb({
          data : JSON.parse(JSON.stringify(result))
        })
      })
    }
      break;
    
    /*---------FLOOR DETAILS---------*/
    case "FLOOR" :
    if(!details.key){
      ROOM.findAll({
        attributes:["id","roomNumber"],
        where :{ floorId : details.id}
      }).then((result)=>{
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      })
    } else {
      ROOM.findAll({
        where :{ floorId : details.id,
        roomNumber :{ [Op.like]:`%${details.key}`}
        }
      }).then((result)=>{
        return cb({
          data : JSON.parse(JSON.stringify(result))
        })
      })
    }
    break;

    /*---------ROOM DETAILS------------*/
    case "ROOM":
      ROOM.findAll({
        attributes: ["id", "roomNumber"],
        include: [
          {
            model: ROOMINFO,
            attributes: ["id", "userId"],
          },
        ],
        where: { id: details.id },
      }).then((result) => {
        console.log(JSON.parse(JSON.stringify(result)));
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      });
      break;

    /*---------USERINFO---------------*/
    case "ROOMINFO":
      ROOMINFO.findAll({
        attributes: { exclude: ["id", "createdAt", "updatedAt", "joinDate"] },
        include: [
          {
            model: USER,
            attributes: ["id", "firstName", "lastname", "email", "phoneNumber"],
          },
        ],
        where: { roomId: details.id },  
      }).then((result) => {
        return cb(
          commonService.SUCCESS_MSG(
            CONSTANT_MSG.success,
            CONSTANT_MSG.success_code,
            CONSTANT_MSG.data_ok,
            JSON.parse(JSON.stringify(result))
          )
        );
      }); 
  }
}



module.exports = { blockDetails };
