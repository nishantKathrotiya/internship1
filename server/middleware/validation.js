


exports.isValidForm = async (req, res, next) => {
  console.log(req.files);
  if(Object.keys(req.body).length === 0){
    res.json({
      success:false,
      message:"File Upload Fails"
    })
  }
  
    try {
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
        
        if(
             fname==""
            || mname==""
            || lname==""
            || studentID==""
            || mobileNumber==""
            || department==""
            || pgUg==""
            || institute==""
            || attendance==""
            || paperTitle==""
            || publisherDetail==""
            || conferenceName==""
            || conferenceWebsite==""
            || regFees==""
            || indexing==""
            || facultyCoAuthorName==""
            || facultyDepartment==""
            || facultyInstitute==""
            || ((firstAuthor=='No') && (authorFullName=="" || authorRollNo==""))
        ){

        
            return res.json({
                success:false,
                message:"All Field Required"
            });
        }

        next();

    } catch (error) {
      console.log(error)
      return res.json({
        success: false,
        msg: "error while checking Data",
      });
      
    }
  };