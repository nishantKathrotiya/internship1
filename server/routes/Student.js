const express = require("express")
const router = express.Router()

const {isValidForm} = require("../middleware/validation")
const  { isLoggedin , isStudent } = require("../middleware/AuthMiddleware");
const {newApplication  , dashboard , viewApplication ,downloadPDF } = require("../controller/Student");

const {upload} = require("../config/multerConfig");

router.post("/application",isLoggedin , isStudent, upload.fields([
    { name: 'conferenceAcceptance', maxCount: 1 },
    { name: 'regFeesProof', maxCount: 1 },
    { name: 'indexingProof', maxCount: 1 }
]),isValidForm ,newApplication);

router.get("/dashboard" ,isLoggedin , isStudent , dashboard );
router.get("/viewapplication" ,isLoggedin , isStudent , viewApplication );
router.get("/downloaddocument"  , downloadPDF );


module.exports = router;