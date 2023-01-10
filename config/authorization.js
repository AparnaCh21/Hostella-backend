const json = require("jsonwebtoken");
module.exports =  {authorize} ;
const commonService = require("../utils/response.js");
const CONSTANT_MSG = require("../utils/message.js");


function authorize(userRole) {
    return ((req,res,next)=>{
      const token=req.cookies;
      json.verify(token.Token,process.env.KEY,(err,data)=>{
          if(err) throw err;
          else{
            if(data.roleId == userRole){
              next();
            }
            else {
              res.send(
                commonService.SUCCESS_MSG(CONSTANT_MSG.success,CONSTANT_MSG.success_code,CONSTANT_MSG.unauthorised_User)
              )
              res.send({
                status: "Failure",
                code : "400",
                Message : "Unauthorised user..."});
            }
          }
        })
    });
}
