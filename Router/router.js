/*------------------------------------------------------------*/
/*-----------------------------------------------------------*/
/*----------------THIS FILE IS NOT IN USE-------------------*/
/*---------THIS ONE IS A REFERENCE FILE FOR API------------*/
/*--------------------------------------------------------*/
/*-------------------------------------------------------*/




const express = require("express");
const router = express.Router();

/*const constant = require("../utils/constant.js");
const { authorize } = require("../config/authorization.js");
const { createHostel } = require("../Controller/adminController/hostel.js");
const { getHostel } = require("../Controller/adminController/hostel.js");
const { addPerson } = require("../Controller/adminController/hostel.js");
const { roomList } = require("../Controller/adminController/hostel.js");
const { userHostelDetails } = require("../Controller/userController/hostelController.js");*/
const { registerUser} = require("../Controller/guestController/register.js");
const { loginUser,refreshToken } = require("../Controller/guestController/login.js");

router.post('/registerUser',registerUser);
router.get('/login',loginUser);
router.get('/refreshToken',refreshToken); 
/*router.post('/createHostel',authorize(constant.roles.OWNER.id),createHostel);
router.get('/getHostel',getHostel);
router.post('/addPerson',authorize(constant.roles.OWNER.id),addPerson);
router.get('/getRoomsListPerHostel',roomList);
router.get('/userHostelDetails',userHostelDetails);*/
                                                                                               
module.exports = router;

