const path = require('path')
const applicationModal = require("../model/appllication")

const newApplication = async (req,res)=>{
    try{   
        
        const {
            fname,
            mname,
            lname,
            studentID,
            mobileNumber,
            department,
            pgUg,
            institute,
            attendance,
            paperTitle,
            publisherDetail,
            conferenceName,
            conferenceWebsite,
            regFees,
            indexing,
            firstAuthor,
            authorFullName,
            authorRollNo,
            facultyCoAuthorName,
            facultyDepartment,
            facultyInstitute,
        } = req.body;
        
        const respone = await applicationModal.create({
            fname,
            mname,
            lname,
            studentID,
            mobileNumber,
            department,
            pgUg,
            institute,
            attendance,
            paperTitle,
            publisherDetail,
            conferenceName,
            conferenceWebsite,
            regFees,
            indexing,
            firstAuthor,
            authorFullName : firstAuthor=="Yes" ? (null) :  (authorRollNo),
            authorRollNo:firstAuthor=="Yes" ? (null) :  (authorFullName),
            facultyCoAuthorName,
            facultyDepartment,
            facultyInstitute,
            conferenceAcceptance: {
               name:req.files.conferenceAcceptance[0].filename,
            },
            regFeesProof: {
                name:req.files.regFeesProof[0].filename,
            },
            indexingProof: {
                name:req.files.indexingProof[0].filename,
            },
        })
        
        res.json({
            success:true,
            answer : respone,
            message:"Application Submitted",
        });

    // const filePath = path.resolve(__dirname, '..', 'Files', '665dbc9f8f0ed5d1b41c9134', 'JENIL.PDF');
    // res.sendFile(filePath, (err) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({
    //       success: false,
    //       message: "Error sending file"
    //     });
    //   }
    // });
    // res.download(filePath);

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"SomeThing Went Wrong"
        })
    }
}


module.exports = {newApplication}
