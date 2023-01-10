const registerService = require("../../Services/Common/registerService.js");


module.exports = { registerUser };

function registerUser(req, res) {
  if (
    req.body.firstName == "" ||
    req.body.lastName == "" ||
    req.body.email == "" ||
    req.body.phoneNumber == "" ||
    req.body.countryCode == "" ||
    req.body.roleId == "" ||
    req.body.isActive == "" ||
    req.body.password == ""
  ) {
    res.send("Fields are required!...");
  }
  registerService.registerUser(req.body, res,(msg) => {
    res.send(msg);
  });
}
