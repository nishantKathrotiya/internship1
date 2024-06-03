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
        confirmation,
        conferenceAcceptance,
        regFeesProof,
        indexingProof,
    } = req.body.formData;
      
    console.log( fname,
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
        confirmation,
        conferenceAcceptance,
        regFeesProof,
        indexingProof)

        // const {formData} = req.body;
        // console.log(formData);

        res.json({
            success:true,
            msg:"Application Submitted",

        })
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            msg:"SomeThing Went Wrong"
        })
    }
}


module.exports = {newApplication}