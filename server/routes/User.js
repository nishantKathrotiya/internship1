const express = require("express")
const router = express.Router()

const { login, signUp, sendOTP,resetPassword , createAdmin , changePassword} = require("../controller/Auth");


router.post("/login", login);                   
router.post("/signup", signUp);                   
router.post("/sendotp", sendOTP);  
router.post("/adminsignup",createAdmin)
router.post("/reset-password",resetPassword);       
router.post("/change-password",changePassword); 

module.exports = router;