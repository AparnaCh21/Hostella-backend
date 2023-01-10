const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
const ADD_PERSON = require("../../Sequelize/Table/roomInfoTable.js");
const Bill = require("../../Sequelize/Table/billTable.js");

var year,month ;

function addPerson(details,res,cb){
    let currentDate = new Date().toJSON().slice(0,10);
    ADD_PERSON.create({
        roomId   : details.roomId,
        guestId  : details.guestId,
        hostelId : details.hostelId,
        ownerId  : details.ownerId,
        joinDate : currentDate
    }).then((result)=>{
        addBill(details,JSON.parse(JSON.stringify(result.id)));
        console.log("Guest Added....");
        return cb(
            commonService.SUCCESS_MSG(
              CONSTANT_MSG.success,
              CONSTANT_MSG.success_code,
              CONSTANT_MSG.add_Person,
              JSON.parse(JSON.stringify(result))
            )
          );
    })
}



function addBill(data,roominfoId){
  let currentDate = new Date().toJSON().slice(8,10);
  initialAmount = (31-currentDate)*(5000/30);
  Bill.create({
    roomInfoId   : roominfoId,
    guestId      : data.guestId,
    hostelId     : data.hostelId,
    ownerId      : data.ownerId,
    amount       : initialAmount,
    year         : new Date().toJSON().slice(0,4),
    month        : new Date().toString().split(' ')[1],
    status       : "Pending",
    paidDate     : new Date().toJSON().slice(0,10),
  }).then((result) => {
    console.log(JSON.parse(JSON.stringify(result)));
  }).catch((err)=>{
    console.log(err);
  })
}

module.exports= { addPerson,addBill };