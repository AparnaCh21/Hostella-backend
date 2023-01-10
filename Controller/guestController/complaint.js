const COMPLAINT = require("../../Services/Guest/guestComplaints.js");

module.exports = { guestComplaint, deleteComplaint };

function guestComplaint(req, res) {
    COMPLAINT.guestComplaints(req,req.body,req.cookies,res,(msg)=>{
        res.status(200).send(msg);
    })
}

function deleteComplaint(req,res){
    COMPLAINT.deleteComplaint(req,res,(msg)=>{
        res.send(msg);
    })
}

