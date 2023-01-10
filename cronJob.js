const connection = require("./config/database.js");
const Bill = require("./Sequelize/Table/billTable.js");

module.exports = { data };

  /*******************GENERATING BILLS FOR EVERY MONTH********************/
async function data() {
  let current_Year = new Date().toJSON().slice(0, 4);
  let current_Month = JSON.stringify(new Date().toString().split(" ")[1]);
  let amount = 5000;
  let sql = `call addbill(${current_Year},${current_Month},${amount})`;
  let res = await connection.query(sql, (err, data) => {
    if (err) throw err;
    else {
      console.log(data);
    }
  });
}                                                    

/******************GENERATING BILL MANUALLY******************************/

// async function manualBill(month) {
//   await Bill.findAll({
//     where: { month: `${month}` },
//   }).then((result) => {
//     if (result[0] != null) {
//       console.log("Bill Generated!....");
//     } else {                            
//       let current_Year = new Date().toJSON().slice(0, 4);
//       let current_Month = JSON.stringify(month);
//       let amount = 5000;
//       let sql = `call addbill(${current_Year},${current_Month},${amount})`;
//       let res =  connection.query(sql, (err, data) => {
//         if (err) throw err;
//         else {
//           console.log(data);
//         }
//       });
//     }
//   });
// }
