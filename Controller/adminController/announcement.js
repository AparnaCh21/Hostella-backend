const Announcement = require("../../Services/Admin/announcements.js");

module.exports = { newAnnouncement, deleteAnnouncement };

function newAnnouncement(req,res){
    Announcement.createAnnouncement(req.body,res,(msg)=>{
        res.send(msg);
    })
}

function deleteAnnouncement(req,res){
    Announcement.deleteAnnouncement(req,res,(msg)=>{
        res.send(msg);
    })
}