

const newApplication = async (req,res)=>{
    try{   
     
        res.json({
            success:true,
            message:"Application Submitted",

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


// function nakamu(){
//     const {
//         fname,
//         mname,
//         lname,
//         studentID,
//         mobileNumber,
//         department,
//         pgUg,
//         institute,
//         attendance,
//         paperTitle,
//         publisherDetail,
//         conferenceName,
//         conferenceWebsite,
//         regFees,
//         indexing,
//         firstAuthor,
//         authorFullName,
//         authorRollNo,
//         facultyCoAuthorName,
//         facultyDepartment,
//         facultyInstitute,
//         conferenceAcceptance,
//         regFeesProof,
//         indexingProof,
//     } = req.body.formData;


//     if(
//          fname==""
//         || mname==""
//         || lname==""
//         || studentID==""
//         || mobileNumber==""
//         || department==""
//         || pgUg==""
//         || institute==""
//         || attendance==""
//         || paperTitle==""
//         || publisherDetail==""
//         || conferenceName==""
//         || conferenceWebsite==""
//         || regFees==""
//         || indexing==""
//         || facultyCoAuthorName==""
//         || facultyDepartment==""
//         || facultyInstitute==""
//         || !conferenceAcceptance
//         || !regFeesProof
//         || !indexingProof
//         || ((firstAuthor=='No') && (authorFullName=="" || authorRollNo==""))
//     ){

       

//         console.log( fname,
//             mname,
//             lname,
//             studentID,
//             mobileNumber,
//             department,
//             pgUg,
//             institute,
//             attendance,
//             paperTitle,
//             publisherDetail,
//             conferenceName,
//             conferenceWebsite,
//             regFees,
//             indexing,
//             firstAuthor,
//             authorFullName,
//             authorRollNo,
//             facultyCoAuthorName,
//             facultyDepartment,
//             facultyInstitute,
//             conferenceAcceptance,
//             regFeesProof,
//             indexingProof);

//         return res.json({
//             success:false,
//             message:"All Field Required"
//         });
//     }
      
//     console.log( fname,
//         mname,
//         lname,
//         studentID,
//         mobileNumber,
//         department,
//         pgUg,
//         institute,
//         attendance,
//         paperTitle,
//         publisherDetail,
//         conferenceName,
//         conferenceWebsite,
//         regFees,
//         indexing,
//         firstAuthor,
//         authorFullName,
//         authorRollNo,
//         facultyCoAuthorName,
//         facultyDepartment,
//         facultyInstitute,
//         conferenceAcceptance,
//         regFeesProof,
//         indexingProof)

//         // const {formData} = req.body;
//         // console.log(formData);

// }