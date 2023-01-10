const Hostel = require("../Sequelize/Table/hostelTable");

module.exports = { validHostel };

/*--------------Validating Hostel & Owner-Hostel-----------*/ 
async function validHostel(data) {
  var hostel = await Hostel.findAll({ where: { id: data.hostelId } }).then(
    (result) => {
      return JSON.parse(JSON.stringify(result));
    }
  );
  if (hostel[0] != null) {
    if (hostel[0].userId == data.ownerId) {
      return ({ data: true });
    } else {
      return {
        data: null,
        message: "You do not have permission to access that hostel",
      };
    }
  } else {
    return { data: null, message: "No Hostel found with that Id..." };
  }
}
