const express = require("express")
const router = express.Router()

const  { isLoggedin , isStudent } = require("../middleware/AuthMiddleware");
const {newApplication} = require("../controller/Student");

router.post("/application",isLoggedin , isStudent,newApplication);


module.exports = router;