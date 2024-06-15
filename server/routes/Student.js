const express = require("express")
const router = express.Router()

const {isValidForm} = require("../middleware/validation")
const  { isLoggedin , isStudent, isAdmin } = require("../middleware/AuthMiddleware");
const {newApplication  , dashboard  } = require("../controller/Student");
const {viewApplication , downloadFile}  = require('../controller/Common');

const {upload} = require("../config/multerConfig");

router.post("/application",isLoggedin , isStudent, upload.fields([
    { name: 'conferenceAcceptance', maxCount: 1 },
    { name: 'regFeesProof', maxCount: 1 },
    { name: 'indexingProof', maxCount: 1 }
]),isValidForm ,newApplication);

router.get("/dashboard" ,isLoggedin , isStudent , dashboard );
router.get("/viewapplication" , isLoggedin , viewApplication);
router.get('/download' , isLoggedin ,downloadFile )


module.exports = router;