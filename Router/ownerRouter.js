const express = require("express");
const router = express.Router();

const OWNER = require("../utils/path.js");
const constant = require("../utils/constant.js");
const { authorize } = require("../config/authorization.js");
const { createHostel } = require("../Controller/adminController/hostel.js");
const { addPerson } = require("../Controller/adminController/hostel.js");
const { roomList } = require("../Controller/adminController/hostel.js");
const { updateComplaint } = require("../Controller/adminController/hostel.js");
const { complaintList } = require("../Controller/adminController/hostel.js");
const { newAnnouncement } = require("../Controller/adminController/announcement.js");
const { deleteAnnouncement } = require("../Controller/adminController/announcement.js")




router.post(OWNER.registerHostel,authorize(constant.roles.OWNER.id),createHostel);
router.post(OWNER.addPerson,authorize(constant.roles.OWNER.id),addPerson);
router.get(OWNER.roomList,authorize(constant.roles.OWNER.id),roomList);
router.post(OWNER.updateComplaint,authorize(constant.roles.OWNER.id),updateComplaint);
router.get(OWNER.complaintList,authorize(constant.roles.OWNER.id),complaintList);
router.post(OWNER.newAnnouncement,authorize(constant.roles.OWNER.id),newAnnouncement);
router.get(OWNER.deleteAnnouncement,authorize(constant.roles.OWNER.id),deleteAnnouncement);


module.exports = router ;     
