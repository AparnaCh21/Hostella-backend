const HOSTEL = require("../../Services/Guest/guestHostelDetails.js");

module.exports = { guestHostelDetails };

function guestHostelDetails(req, res) {
    HOSTEL.hostelDetails(req,res,(msg) => {
        res.send(msg);
    });
}

