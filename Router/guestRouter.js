const express = require("express");
const router = express.Router();

const { guestHostelDetails } = require("../Controller/guestController/hostelController.js");
const { guestComplaint } = require("../Controller/guestController/complaint.js");
const { deleteComplaint } = require("../Controller/guestController/complaint.js");
const GUEST = require("../utils/path.js");

router.get(GUEST.guestHostelDetails,guestHostelDetails);
router.post(GUEST.guestComplaint,guestComplaint);
router.get(GUEST.deleteComplaint,deleteComplaint);

module.exports = router;