const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    mname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    studentID: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
        enum: ["CE", "CS", "IT"],
    },
    pgUg: {
        type: String,
        required: true,
        enum: ["PG", "UG"],
    },
    institute: {
        type: String,
        required: true,
        enum: ["DEPSTAR", "CSPIT"],
        default: "DEPSTAR",
    },
    attendance: {
        type: Number,
        required: true,
    },
    paperTitle: {
        type: String,
        required: true,
    },
    publisherDetail: {
        type: String,
        required: true,
    },
    conferenceName: {
        type: String,
        required: true,
    },
    conferenceWebsite: {
        type: String,
        required: true,
    },
    regFees: {
        type: Number,
        required: true,
    },
    indexing: {
        type: String,
        required: true,
        enum: ["Scopus", "Web Science"],
    },
    firstAuthor: {
        type: String,
        required: true,
        enum: ["Yes", "No"],
    },
    authorFullName: {
        type: String,
        required: function() {
            return this.firstAuthor === "No";
        }
    },
    authorRollNo: {
        type: String,
        required: function() {
            return this.firstAuthor === "No";
        }
    },
    facultyCoAuthorName: {
        type: String,
        required: true,
    },
    facultyDepartment: {
        type: String,
        required: true,
        enum: ["CE", "CS", "IT"],
    },
    facultyInstitute: {
        type: String,
        required: true,
        enum: ["DEPSTAR", "CSPIT"],
        default: "DEPSTAR",
    },
    confirmation: {
        type: Boolean,
        required: true,
    },
    conferenceAcceptance: {
        type: Buffer, 
        required: true,
    },
    regFeesProof: {
        type: Buffer, 
        required: true,
    },
    indexingProof: {
        type: Buffer, 
        required: true,
    },
});

module.exports = mongoose.model("Application", applicationSchema);


// function test(){
//     const formFields = [
//         "fname",
//         "mname",
//         "lname",
//         "studentID",
//         "mobileNumber",
//         "department",
//         "pgUg",
//         "institute",
//         "attendance",
//         "paperTitle",
//         "publisherDetail",
//         "conferenceName",
//         "conferenceWebsite",
//         "regFees",
//         "indexing",
//         "firstAuthor",
//         "authorFullName",
//         "authorRollNo",
//         "facultyCoAuthorName",
//         "facultyDepartment",
//         "facultyInstitute",
//         "confirmation",
//         "conferenceAcceptance",
//         "regFeesProof",
//         "indexingProof",
//       ];
      
// }