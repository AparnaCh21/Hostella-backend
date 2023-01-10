const loginService = require("../../Services/Common/loginService.js");


module.exports = { loginUser,refreshToken };



function loginUser(req, res) {
  if (req.body.email == "" || req.body.password == "") {
    res.send("Fields are Required!...");
  }
  loginService.loginUser(req.body, res, (msg) => {
    res.send(msg);
  });
}

function refreshToken(req,res){
  if(!req.cookies?.Token){
    res.status(406).send('Unauthorized!')
  }
  const refreshToken = req.cookies.Token;
    loginService.refreshToken(refreshToken,(result)=>{
      res.send(result)
    })
}