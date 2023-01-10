const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER = require("../../Sequelize/Table/userTable");
const commonService = require("../../utils/response.js");
const CONSTANT_MSG = require("../../utils/message.js");

module.exports = { loginUser, refreshToken };

async function loginUser(loginDetails, res, cb) {
  console.log(loginDetails);
  var userDetails = await USER.findOne({
    where: { email: `${loginDetails.email}` },
  }).then((result) => {
    if (result) {
      return result.dataValues;
    } else {
      return cb(
        commonService.FAILURE_MSG(
          CONSTANT_MSG.failure,
          CONSTANT_MSG.failure_code,
          CONSTANT_MSG.no_Data
        )
      );
    }
  });

  const accessPass = bcrypt.compareSync(loginDetails.password, userDetails.pwd);
  if (accessPass) {
    delete userDetails.pwd;
    console.log(userDetails)
    const token = jwt.sign(userDetails, process.env.KEY,{expiresIn:"1h"});

    //Refresh Token
    const refreshToken = jwt.sign(
      userDetails,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Assigning refresh token in http-only cookie
    res.cookie("Token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("loggedInUser", loginDetails.email);
    res.cookie("Token", token);
    return cb(
      commonService.SUCCESS_MSG(
        CONSTANT_MSG.success,
        CONSTANT_MSG.success_code,
        CONSTANT_MSG.data_ok,
        token
      )
    );
  } else {
    return cb(
      commonService.FAILURE_MSG(
        CONSTANT_MSG.failure,
        CONSTANT_MSG.failure_code,
        CONSTANT_MSG.no_Data
      )
    );
  }
}

async function refreshToken(refreshToken,cb) {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return cb(commonService.FAILURE_MSG("Failure", "406", "Unauthorized"));
      } else {
        console.log(decoded);
        const userDetails = decoded.userDetails;
        const accessToken = jwt.sign(userDetails, process.env.KEY);
        return cb(commonService.SUCCESS_MSG(
          CONSTANT_MSG.success,
          CONSTANT_MSG.success_code,
          CONSTANT_MSG.data_ok,
          accessToken
        ));
      }
    }
  );
}
