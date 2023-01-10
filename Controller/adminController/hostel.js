const hostelService = require("../../Services/Admin/createHostel.js");
const hostelDetails = require("../../Services/Admin/getHostel.js");
const hostelInfo = require("../../Services/Admin/roomList.js")
const addGuest = require("../../Services/Admin/addPerson.js");
const editComplaint = require("../../Services/Admin/updateComplaintStatus.js");
const complaint = require("../../Services/Admin/complaintList.js");

module.exports = { createHostel, getHostel, addPerson, roomList, complaintList, updateComplaint };

async function createHostel(req, res) {
  await hostelService.createHostel(req.body, req.cookies, res,(msg) => {
    res.send(msg);
  });
}

/*----Gets all HOSTEL details----*/
function getHostel(req, res) {
  hostelDetails.getHostelDetails(req.cookies,res,(msg)=>{
    res.send(msg)
  });
}

/*----Gets Number of Guest in the room----*/
function roomList(req,res){
  hostelInfo.blockDetails(req.body,res,(msg) =>{
    res.send(msg);
  });
}


/*------Adding Person to Room--------*/
function addPerson(req, res){
  addGuest.addPerson(req.body,res,(msg) =>{
    res.send(msg);
  });
}


/*--------Listing Complaint List-------*/
function complaintList(req,res){
  complaint.guestComplaintList(req.body,res,(msg) =>{
    res.send(msg);
  })
}


/*-----Updatin GuestComplaint Status-----*/
function updateComplaint(req,res){
  editComplaint.updateComplaintStatus(req.body,res,(msg)=>{
    res.send(msg);
  })
}

