const express = require("express")
const router = express.Router()

const  { isLoggedin , isStudent } = require("../middleware/AuthMiddleware");
const {newApplication} = require("../controller/Student");
const {isValidForm} = require("../middleware/validation")

const {upload} = require("../config/multerConfig")

router.post("/application",isLoggedin , isStudent, upload.fields([
    { name: 'conferenceAcceptance', maxCount: 1 },
    { name: 'regFeesProof', maxCount: 1 },
    { name: 'indexingProof', maxCount: 1 }
]),isValidForm ,newApplication);


module.exports = router;