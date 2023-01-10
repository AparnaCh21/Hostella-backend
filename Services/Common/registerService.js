const bcrypt = require("bcrypt");
const NEW_USER = require("../../Sequelize/Table/userTable.js");
const Role = require("../../utils/constant.js");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");
module.exports = {
  registerUser,
};

async function registerUser(userDetails, res, cb) {
  const salt = bcrypt.genSaltSync(10);
  const encrypt = bcrypt.hashSync(userDetails.password, salt);

  var roleid = Role.roles[`${userDetails.roleId}`];

  const result = await NEW_USER.create({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    phoneNumber: userDetails.phoneNumber,
    countryCode: userDetails.countryCode,
    roleId: roleid.id,
    isActive: userDetails.isActive,
    pwd: encrypt,
  })
    .then((user) => {
      console.log("User Created");
      return cb(
        commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.data_ok,
          JSON.parse(JSON.stringify(user))
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
