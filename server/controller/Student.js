const userModel = require("../model/userDetails");
const applicationModal = require("../model/appllication");
const userDetails = require("../model/userDetails");

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


        //new entry data at collection
        const respone = await applicationModal.create({
            fname,
            mname,
            lname,
            studentID,
            studentDBID:req.user._id,
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
            conferenceAcceptance: req.files.conferenceAcceptance[0].filename,
            regFeesProof:req.files.regFeesProof[0].filename,
            indexingProof: req.files.indexingProof[0].filename,
            status:{
                status:"pending",
                msg:null
            }
        });

        //Upadting user and adding the application id to user
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            $push:{
                applications:respone._id,
            }
        });

        //Sending the response
        res.json({
            success:true,
            answer : respone,
            message:"Application Submitted",
        });

    }catch(err){

        res.json({
            success:false,
            message:"SomeThing Went Wrong"
        })

    }
}

const dashboard = async (req,res)=>{
    try{

        //Collecting ids of application from user Collection
        const applicationIDS = await userDetails.findOne(req.user._id , {applications:1});
        const ids = applicationIDS.applications;

        //passing all the application ids to find all the application
        //but only the few details like [name , date and status]
        const applications = await applicationModal.find({'_id':{$in:ids}} , {paperTitle:1 ,createdAt:1,status:1  });


        res.send({
            success:true,
            applications
        })

    }catch(error){

        console.log(error   )
        res.json({
            success:false,
            message:"SomeThing Went Wrong"
        })

    }
}

const viewApplication = async (req,res)=>{
    try{

        const {id} = req.query;
        if(!id){
            return res.json({
                success:false,
                message:"Id Not Found"
            })
        }

        //passing all the application ids to find all the application
        //but only the few details like [name , date and status]
        const application = await applicationModal.findById(id);


        res.send({
            success:true,
            application
        })


    }catch(error){

        console.log(error   )
        res.json({
            success:false,
            message:"SomeThing Went Wrong"
        })

    }
}

module.exports = {newApplication , dashboard , viewApplication}
