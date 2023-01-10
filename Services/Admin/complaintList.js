const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Complaint = require("../../Sequelize/Table/complaintTable");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");

module.exports = { guestComplaintList };

function guestComplaintList(data, res, cb) {
  if(!data.key){
  Complaint.findAll({
    attributes: ["userId", "complaint"],
    where: { hostelId : data.hostelId },
  })
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result)));
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.data_ok,
          JSON.parse(JSON.stringify(result))
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    Complaint.findAll({
      attributes : ["complaint"],
      where :{ complaint : { [Op.like]:`%${data.key}%` },hostelId : data.hostelId }
    }).then((result) =>{
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.data_ok,
          JSON.parse(JSON.stringify(result))
        )
      )
    }).catch((err)=>{
      console.log(err);
    })
  }
}
