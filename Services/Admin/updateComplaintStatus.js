const Complaint = require("../../Sequelize/Table/complaintTable.js");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
const { status } = require("../../utils/constant.js");

module.exports = { updateComplaintStatus };

function updateComplaintStatus(data, res, cb) {
  if (data.status == "PROCESSING") {
    currentStatus = status.PROCESSING;
  } else if (data.status == "COMPLETED") {
    currentStatus = status.COMPLETED;
  } else if (data.status == "CANCELLED") {
    currentStatus = status.CANCELLED;
  }
  Complaint.update(
      { action: currentStatus },
      { where : {id : data.id}}
    )
    .then((result) => {
        return cb(
            commonService.SUCCESS_MSG(
                CONSTANT_MSG.success,
                CONSTANT_MSG.SUCCESS_MSG,
                CONSTANT_MSG.updated,
                result
            )
        )
    })
    .catch((err) => console.log(err));
}
