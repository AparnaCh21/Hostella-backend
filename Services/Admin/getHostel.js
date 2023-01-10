const USER = require("../../Sequelize/Table/userTable.js");
const HOSTEL = require("../../Sequelize/Table/hostelTable.js");
const BLOCK = require("../../Sequelize/Table/blockTable.js");
const FLOOR = require("../../Sequelize/Table/floorTable.js");
const ROOM = require("../../Sequelize/Table/roomTable.js");
function getHostelDetails(cookie, res,cb) {

  const hostelDetails = USER.findAll({
    include:[{
      model : HOSTEL,
      attributes : ["id","hostelName"],
      include :[{
        model : BLOCK,
        attributes : ["id","blockName"],
        include : [{
          model : FLOOR,
          atributes : ["id","floorNumber"],
          include : [{
            model : ROOM,
            atributes : ["id","roomNumber"],
          }]
        }]
      }]
    }], where :{ email : cookie.loggedInUser }
  }).then((result)=>{
    console.log(result);
    return cb(
      commonService.SUCCESS_MSG(
        CONSTANT_MSG.success,
        CONSTANT_MSG.success_code,
        CONSTANT_MSG.data_ok,
        JSON.parse(JSON.stringify(result))
      )
    );
  }) 



}
module.exports = { getHostelDetails };
