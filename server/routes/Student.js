const express = require("express")
const router = express.Router()

const  { isLoggedin , isStudent, isAdmin } = require("../middleware/AuthMiddleware");
const {isValidForm,  isValidUpdateForm , isValidUpdate} = require("../middleware/validation")

const {viewApplication , downloadFile}  = require('../controller/Common');
const {newApplication  , dashboard , editInitialData ,updateApplication , deleteApplication } = require("../controller/Student");

const {upload} = require("../config/multerConfig");

router.post("/application",isLoggedin , isStudent, upload.fields([
    { name: 'conferenceAcceptance', maxCount: 1 },
    { name: 'regFeesProof', maxCount: 1 },
    { name: 'indexingProof', maxCount: 1 }
]),isValidForm ,newApplication);

router.get("/dashboard",isLoggedin,isStudent,dashboard );
router.get("/viewapplication",isLoggedin,isStudent,viewApplication);
router.get('/download' ,isLoggedin,isStudent,downloadFile );
router.get('/initalData',isLoggedin,isStudent,isValidUpdate,editInitialData );
router.delete('/delete',isLoggedin,isStudent,isValidUpdate,deleteApplication );
router.post("/update",isLoggedin,isStudent,isValidUpdate,isValidUpdateForm,updateApplication);



module.exports = router;