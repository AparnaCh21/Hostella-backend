const Announcement = require("../../Sequelize/Table/announcementTable.js");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
const VALIDATION = require("../../Validation/validateAnnouncement.js");

module.exports = { createAnnouncement, deleteAnnouncement };

async function createAnnouncement(data, res, cb) {
  /*-------------------Checking whether this hostel is Present under the loggedIn Owner---------------*/
  let response = await VALIDATION.validHostel(data);
  /*---------------------------------------*/
  if (data.message == "") {
    return cb(
        commonService.SUCCESS_MSG(
            CONSTANT_MSG.failure,
            CONSTANT_MSG.failure_code,
            CONSTANT_MSG.required,
            []
        )
    );
  } else {
    if (response.data) {
      if (!data.id) {
/*------------------Creates Announcement Message----------------- */
        Announcement.create({
          ownerId: data.ownerId,
          hostelId: data.hostelId,
          message: data.message,
        })
          .then((result) => {
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
/*---------------------Update Announcement Message---------------------*/
        Announcement.update(
          { message: data.message },
          { where: { id: data.id } }
        )
          .then((result) => {
            console.log(result);
            return cb(
              commonService.SUCCESS_MSG(
                CONSTANT_MSG.success,
                CONSTANT_MSG.success_code,
                CONSTANT_MSG.data_ok,
                "Message updated Successfully!..."
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      return cb(
        commonService.FAILURE_MSG(
          CONSTANT_MSG.failure,
          CONSTANT_MSG.failure_code,
          CONSTANT_MSG.no_Data,
          response.message
        )
      );
    }
  }
}

/*------------------Deletes Announcement Message--------------*/
function deleteAnnouncement(req, res, cb) {
  Announcement.destroy({
    where: { id: req.query.id },
  }).then((result) => {
    console.log(result);
    return cb(
      commonService.SUCCESS_MSG(
        CONSTANT_MSG.success,
        CONSTANT_MSG.success_code,
        CONSTANT_MSG.data_ok,
        "Message Deleted Successfully..."
      )
    );
  });
}
