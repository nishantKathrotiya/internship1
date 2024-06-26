const userModel = require("../model/userDetails");
const applicationModal = require("../model/appllication");
const userDetails = require("../model/userDetails");


var html_to_pdf = require('html-pdf-node');
const {generateHTML} = require("../emailBody/application");
var fs = require('fs');
const path = require("path");
const multer = require("multer");

const newApplication = async (req, res) => {
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
      facultyCoAuthors,
      coAuthors,
    } = req.body;

    var departmentInvolved =[];
    departmentInvolved.push(department);
  
    JSON.parse(coAuthors).forEach((student)=>{
      if(departmentInvolved.indexOf(student.studentDepartment)==-1){
        departmentInvolved.push(student.studentDepartment)
      }
    });

    JSON.parse(facultyCoAuthors).forEach((faculty)=>{
      if(departmentInvolved.indexOf(faculty.facultyCoAuthorDepartment)==-1){
        departmentInvolved.push(faculty.facultyCoAuthorDepartment)
      }
    });

    var hodStatus = {};
     departmentInvolved.forEach((department)=> {
      hodStatus[`${department}`] = {
        status:'pending',
        nsg:null
      }
    } );

    //new entry data at collection
    const response = await applicationModal.create({
      fname,
      mname,
      lname,
      studentID,
      studentDBID: req.user._id,
      mobileNumber,
      department,
      pgUg,
      institute,
      attendance,
      coAuthors :JSON.parse(coAuthors) ,
      paperTitle,
      publisherDetail,
      conferenceName,
      conferenceWebsite,
      regFees,
      indexing,
      firstAuthor,
      authorFullName: firstAuthor == "Yes" ? null : authorRollNo,
      authorRollNo: firstAuthor == "Yes" ? null : authorFullName,
      facultyCoAuthors:JSON.parse(facultyCoAuthors),
      conferenceAcceptance: req.files.conferenceAcceptance[0].filename,
      regFeesProof: req.files.regFeesProof[0].filename,
      indexingProof: req.files.indexingProof[0].filename,
      status: {
        status: "pending",
        msg: null,
      },
      departmentInvolved,
      hodStatus
    });

    //Upadting user and adding the application id to user
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        applications: response._id,
      },
    },{new:true});

    const html = generateHTML(response)

    let options = { format: "A4" };

    const pdfBuffer = await html_to_pdf.generatePdf({ content: html }, options);

    // Ensure directory exists for user files
    const userId = String(req.user._id);
    const filePath = path.join(__dirname, "../Files", userId);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    const pdfFileName = `${response._id}.pdf`;

    // Write PDF to file system
    fs.writeFileSync(path.join(filePath, pdfFileName), pdfBuffer);

    //Sending the response
    res.json({
      success: true,
      answer: response,
      message: "Application Submitted",
    });
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: "SomeThing Went Wrong",
    });
  }
};

const dashboard = async (req, res) => {
  try {
    //Collecting ids of application from user Collection
    const applicationIDS = await userDetails.findOne(req.user._id, {
      applications: 1,
    });
    const ids = applicationIDS.applications;

    //passing all the application ids to find all the application
    //but only the few details like [name , date and status]
    const applications = await applicationModal.find(
      { _id: { $in: ids } },
      { paperTitle: 1, createdAt: 1, status: 1 }
    );

    res.send({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "SomeThing Went Wrong",
    });
  }
};


module.exports = { newApplication, dashboard };
