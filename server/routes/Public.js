const express = require("express")
const router = express.Router()

const { viewApplication , downloadFile,getDashboardStats } = require("../controller/Common");
const { isLoggedin  } = require("../middleware/AuthMiddleware");

router.get("/view" ,isLoggedin , viewApplication );
router.get("/stats" ,getDashboardStats );
router.post("/download" ,isLoggedin , downloadFile );


module.exports = router;