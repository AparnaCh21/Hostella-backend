const PATH = {
    OWNER : "/api/v1/owner",
    ADMIN : "/api/v1/admin",
    GUEST : "/api/v1/guest",
}


module.exports={
registerHostel     : PATH.OWNER + '/createHostel',
addPerson          : PATH.OWNER + '/addPerson',
roomList           : PATH.OWNER + '/roomList',
updateComplaint    : PATH.OWNER + '/updateComplaintStatus',
complaintList      : PATH.OWNER + '/guestComplaintList',
newAnnouncement    : PATH.OWNER + '/newAnnouncement',
deleteAnnouncement : PATH.OWNER + '/deleteAnnouncement',
guestHostelDetails : PATH.GUEST + '/guestHostelDetails',
guestComplaint     : PATH.GUEST + '/guestComplaint',
deleteComplaint    : PATH.GUEST + '/deleteComplaint',
}
