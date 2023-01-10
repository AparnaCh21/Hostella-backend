const Complaint = require("../../Sequelize/Table/complaintTable.js");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
const ownerId = require("./guestHostelDetails.js");
const json = require("jsonwebtoken");
const { status } = require("../../utils/constant.js");
const VALIDATION = require("../../Validation/validateComplaint.js");


async function guestComplaints(req, userData, cookies, res, cb) {
/*-----------------------------Validating---------------------------*/
  let loggedInUser = json.verify(cookies.Token, process.env.KEY);
  let response = await VALIDATION.validComplaint(userData,loggedInUser);
  console.log(response);
  var ownId = await ownerId.hostelDetails(req, res, (msg) => {
    return msg.data.hosteldetails["userId"];
  });



  /*----------------Creating Complaint-------------*/
  if(response.data){
  if (!userData.id) {
    await Complaint.create({
      complaint: userData.complaint,
      valid: true,
      action: status.PENDING,
      roomId: userData.roomId,
      userId: loggedInUser.id,
      ownerId: ownId,
      hostelId: userData.hostelId,
    }).then((result) => {
      console.log("Complaint registered !...");
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.complaint_registered,
          JSON.parse(JSON.stringify(result))
        )
      );
    });
  } else {
    /*---------------Update Complaint--------------------*/
    Complaint.update(
      { complaint: userData.complaint },
      { where: { id: userData.id } }
    ).then((result) => {
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.updated,
          result
        )
      );
    });
  }
} else {
  return cb(
    commonService.SUCCESS_MSG(
      CONSTANT_MSG.failure,
      CONSTANT_MSG.failure_code,
      CONSTANT_MSG.no_Data,
      response.message
    )
  )
}
}

/*-----------Delete Complaint-----------------*/

function deleteComplaint(req, res) {
  console.log(req.query);
  Complaint.destroy({ where: { id: req.query.id } })
    .then((result) => {
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.deleted,
          "Complaint with that Id deleted Successfully !...."
        )
      );
    })
    .catch((err) => console.log(err));
}

module.exports = { guestComplaints, deleteComplaint };
